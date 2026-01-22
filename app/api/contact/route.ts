import { NextResponse } from "next/server";
import { Resend } from "resend";

// Force this route to be dynamic (runtime-only, not pre-rendered at build time)
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company, subject, message } = body;

        // Check if API key is present
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error("DEBUG: RESEND_API_KEY is missing from environment variables.");
            return NextResponse.json({
                success: false,
                message: "Server configuration error: Email service not configured."
            }, { status: 500 });
        }

        // Initialize Resend with API key at runtime
        const resend = new Resend(apiKey);

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: "Navagatha Contact Form <onboarding@resend.dev>",
            to: ["info@navagathatech.com"],
            subject: `New Contact Form: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company || "N/A"}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return NextResponse.json({
                success: false,
                message: "Failed to send message. Please try again later."
            }, { status: 500 });
        }

        console.log("Email sent successfully:", data);

        return NextResponse.json({
            success: true,
            message: "Your message has been received and sent to our team."
        }, { status: 200 });

    } catch (error) {
        console.error("Contact Form Error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to send message. Please try again later."
        }, { status: 500 });
    }
}
