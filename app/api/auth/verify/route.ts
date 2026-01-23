import { NextResponse } from "next/server";
import { verifyOTP, createSession } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email, code } = await req.json();

        if (!email || !code) {
            return NextResponse.json({ message: "Email and code are required." }, { status: 400 });
        }

        const isValid = verifyOTP(email, code);

        if (!isValid) {
            return NextResponse.json({ message: "Invalid or expired code." }, { status: 401 });
        }

        await createSession(email);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Verify API Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
