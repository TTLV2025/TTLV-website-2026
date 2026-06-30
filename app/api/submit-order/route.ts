import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = (formData.get("email") as string) || "";
    const notes = (formData.get("notes") as string) || "";
    const file = formData.get("file") as File | null;

    if (!name || !phone || !file) {
      return NextResponse.json(
        { error: "Name, phone, and document are required." },
        { status: 400 }
      );
    }

    // Development fallback: if SMTP is not configured, log and simulate success
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log("=== ORDER RECEIVED (SMTP not configured) ===");
      console.log("Name:", name);
      console.log("Phone:", phone);
      console.log("Email:", email || "(not provided)");
      console.log("Notes:", notes || "(none)");
      console.log("File:", file.name, `(${(file.size / 1024).toFixed(0)} KB)`);
      console.log("============================================");
      return NextResponse.json({ success: true });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const port = parseInt(process.env.SMTP_PORT || "587");
    const isSSL = port === 465;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: isSSL,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Accept self-signed certificates common on small/ISP mail servers
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log(`[SMTP] Connecting to ${process.env.SMTP_HOST}:${port} (secure=${isSSL})`);

    // Verify connection before sending
    try {
      await transporter.verify();
      console.log("[SMTP] Connection verified successfully");
    } catch (verifyErr) {
      console.error("[SMTP] Connection verify failed:", verifyErr);
      throw verifyErr;
    }

    // 1 — Order notification to order desk
    await transporter.sendMail({
      from: `"TTLV Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: "order@territorialtitle.com",
      subject: `New Order from ${name} — Territorial Title Website`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #333;">
          <div style="background: #1B3A5C; padding: 20px 24px;">
            <h2 style="color: #E6B022; margin: 0; font-size: 18px;">New Order Received</h2>
          </div>
          <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 4px; font-weight: 600; color: #555; width: 100px;">Name</td>
                <td style="padding: 8px 4px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 4px; font-weight: 600; color: #555;">Phone</td>
                <td style="padding: 8px 4px;">${phone}</td>
              </tr>
              ${
                email
                  ? `<tr>
                <td style="padding: 8px 4px; font-weight: 600; color: #555;">Email</td>
                <td style="padding: 8px 4px;">${email}</td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding: 8px 4px; font-weight: 600; color: #555;">Document</td>
                <td style="padding: 8px 4px;">${file.name} &nbsp;·&nbsp; ${(file.size / 1024).toFixed(0)} KB</td>
              </tr>
              ${
                notes
                  ? `<tr>
                <td style="padding: 8px 4px; font-weight: 600; color: #555; vertical-align: top;">Notes</td>
                <td style="padding: 8px 4px; white-space: pre-wrap;">${notes}</td>
              </tr>`
                  : ""
              }
            </table>
            <p style="margin-top: 16px; color: #666; font-size: 13px;">The contract document is attached to this email.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: file.name,
          content: fileBuffer,
          contentType: file.type || "application/pdf",
        },
      ],
    });

    console.log(`[SMTP] Order notification sent to order@territorialtitle.com`);

    // 2 — Confirmation to submitter (if email provided)
    if (email) {
      await transporter.sendMail({
        from: `"Territorial Title of Las Vegas" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: email,
        replyTo: "order@territorialtitle.com",
        subject: "Order Received — Territorial Title of Las Vegas",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #333;">
            <div style="background: #1B3A5C; padding: 24px; text-align: center;">
              <h2 style="color: #E6B022; margin: 0; font-size: 20px;">Territorial Title of Las Vegas</h2>
            </div>
            <div style="padding: 28px 24px;">
              <p>Dear ${name},</p>
              <p>Your order has been received. We&apos;ll be in touch within <strong>4 business hours</strong> to confirm and ask any necessary follow-up questions.</p>
              <p style="margin-top: 20px;">If you&apos;d like to follow up in the meantime:</p>
              <ul style="line-height: 2;">
                <li>Email: <a href="mailto:order@territorialtitle.com" style="color: #1B3A5C;">order@territorialtitle.com</a></li>
                <li>Phone: <a href="tel:5054253563" style="color: #1B3A5C;">(505) 425-3563</a></li>
              </ul>
              <p style="margin-top: 20px; color: #777; font-size: 13px;">
                Business hours: Monday–Friday, 8:00 AM–12:00 PM &amp; 1:00 PM–5:00 PM<br/>
                Closed federal holidays
              </p>
            </div>
            <div style="background: #F8F6F0; padding: 16px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e5e7eb;">
              Territorial Title of Las Vegas &nbsp;·&nbsp; 919 Douglas Ave &nbsp;·&nbsp; Las Vegas, NM 87701
            </div>
          </div>
        `,
      });
      console.log(`[SMTP] Confirmation sent to ${email}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[SMTP] Order submission error:", message);
    return NextResponse.json(
      {
        error:
          "Failed to process order. Please call (505) 425-3563 or email order@territorialtitle.com.",
        detail: message,
      },
      { status: 500 }
    );
  }
}
