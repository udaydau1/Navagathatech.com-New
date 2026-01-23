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
    const { error: hrError } = await resend.emails.send({
      from: "Navagatha Careers <contact@navagathatech.com>",
      to: ["hr@navagathatech.com"],
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

    if (hrError) {
      console.error("HR Email Error:", hrError);
      return NextResponse.json({ success: false, message: "Failed to notify HR" }, { status: 500 });
    }

    // Send confirmation email to Applicant
    const { error: applicantError } = await resend.emails.send({
      from: "Navagatha Tech <no_reply@navagathatech.com>",
      to: [email],
      subject: `Application Received: ${jobTitle} at Navagatha Tech`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F172A;">Hello ${name},</h2>
          <p>Thank you for your interest in the <strong>${jobTitle}</strong> position at Navagatha Tech Pvt. Ltd.</p>
          <p>We've successfully received your application and your CV. Our recruitment team is currently reviewing your profile to see if there's a good match.</p>
          <div style="background: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0; margin: 25px 0;">
            <p style="margin: 0; font-size: 14px; color: #64748B;">Applied for:</p>
            <p style="margin: 5px 0 0; font-weight: bold; font-size: 18px; color: #0F172A;">${jobTitle}</p>
          </div>
          <p>If your experience aligns with our requirements, we will reach out to you for the next steps in our hiring process.</p>
          <p>We appreciate the time you took to apply and wish you the best of luck!</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>Team Navagatha</strong><br />Navagatha Tech Pvt. Ltd.</p>
          <hr style="border: none; border-top: 1px solid #EEE; margin: 30px 0;" />
          <p style="font-size: 11px; color: #999; text-align: center;">
            This is an auto-generated email. Please do not reply.<br />
            Andheri (W), Mumbai, India | <a href="https://www.navagathatech.com">navagathatech.com</a>
          </p>
        </div>
      `,
    });

    if (applicantError) {
      console.error("Applicant Email Error:", applicantError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
