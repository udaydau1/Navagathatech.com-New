import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // LOGIC FOR EMAILING:
        // In a real production environment, you would use a service like Resend, SendGrid, or Nodemailer here.
        // Example with a hypothetical mail service:
        /*
        await sendEmail({
            to: "info@navagathatech.com",
            from: "website@navagathatech.com",
            subject: `New Query: ${subject} from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                Company: ${company || "N/A"}
                Subject: ${subject}
                Message: ${message}
            `
        });
        */

        console.log("New Contact Form Submission:", body);

        // For now, we return a success response to the frontend.
        // To enable REAL emails, you just need to plug in your SMTP or Mail service API key.
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
