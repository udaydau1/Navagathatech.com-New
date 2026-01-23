import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "default_secret_for_dev_change_in_prod"
);

// In-memory OTP store (In production, use Redis or a DB)
const otpStore = new Map<string, { code: string; expires: number }>();

export function generateOTP(email: string): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, {
        code,
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    });
    return code;
}

export function verifyOTP(email: string, code: string): boolean {
    const entry = otpStore.get(email);
    if (!entry) return false;

    if (Date.now() > entry.expires) {
        otpStore.delete(email);
        return false;
    }

    if (entry.code === code) {
        otpStore.delete(email);
        return true;
    }

    return false;
}

export async function createSession(email: string) {
    const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(JWT_SECRET);

    (await cookies()).set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { email: string };
    } catch (e) {
        return null;
    }
}

export async function logout() {
    (await cookies()).delete("session");
}
