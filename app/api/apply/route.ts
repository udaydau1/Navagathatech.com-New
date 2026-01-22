import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const experience = formData.get("experience") as string;
        const message = formData.get("message") as string;
        const jobTitle = formData.get("jobTitle") as string;
        const resume = formData.get("resume") as File;

        if (!resume) {
            return NextResponse.json({ success: false, message: "Resume is required" }, { status: 400 });
        }

        // Convert File to ArrayBuffer for Resend
        const arrayBuffer = await resume.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Send email to HR
        const { data, error } = await resend.emails.send({
            from: "Navagatha Careers <contact@navagathatech.com>",
            to: ["info@navagathatech.com"],
            subject: `New Job Application: ${jobTitle} - ${name}`,
            replyTo: email,
            html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0F172A;">New Candidate Application</h2>
          <hr />
          <p><strong>Job Title:</strong> ${jobTitle}</p>
          <p><strong>Candidate Name:</strong> ${name}</p>
          <p><strong>Email ID:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Cover Letter / Message:</strong></p>
          <p style="background: #F8FAFC; padding: 15px; border-radius: 8px; border: 1px solid #E2E8F0;">
            ${message || "No message provided."}
          </p>
          <hr />
          <p style="font-size: 12px; color: #64748B;">This application was submitted via navagathatech.com/careers</p>
        </div>
      `,
            attachments: [
                {
                    filename: resume.name,
                    content: buffer,
                },
            ],
        });

        if (error) {
            console.error("Resend Error:", error);
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
