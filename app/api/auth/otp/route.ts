import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateOTP } from "@/lib/auth";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        // Initialize Resend at runtime
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ message: "Email service not configured" }, { status: 500 });
        }
        const resend = new Resend(apiKey);

        const { email } = await req.json();

        if (!email || !email.endsWith("@navagathatech.com")) {
            return NextResponse.json(
                { message: "Access restricted to @navagathatech.com emails." },
                { status: 403 }
            );
        }

        const otp = generateOTP(email);

        const { error } = await resend.emails.send({
            from: "Navagatha Auth <no_reply@navagathatech.com>",
            to: [email],
            subject: "Your Login OTP - Navagatha Tech",
            html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F172A;">Login Verification</h2>
          <p>Hello,</p>
          <p>You requested a login code for the Navagatha Tech employee portal.</p>
          <div style="background: #F8FAFC; padding: 25px; border-radius: 12px; border: 1px solid #E2E8F0; margin: 30px 0; text-align: center;">
            <p style="margin: 0; font-size: 14px; color: #64748B;">Your 6-digit verification code is:</p>
            <p style="margin: 10px 0 0; font-weight: bold; font-size: 36px; color: #0F172A; letter-spacing: 8px;">${otp}</p>
          </div>
          <p>This code will expire in 5 minutes. If you did not request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #EEE; margin: 30px 0;" />
          <p style="font-size: 11px; color: #999; text-align: center;">Team Navagatha</p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend OTP Error:", error);
            return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Auth API Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
