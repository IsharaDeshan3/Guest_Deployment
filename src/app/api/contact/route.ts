import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limiting map: IP -> array of request timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);

  // Periodically clean up old entries to prevent memory leaks
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      const active = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, active);
      }
    }
  }

  return false;
}

function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // basic tag stripping for XSS prevention
    .trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "anonymous";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many inquiries received from this connection. Please wait a few minutes or contact us directly via WhatsApp at +94 70 680 1910.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 2. Honeypot check (anti-bot)
    if (body.website_hp || body.extra_field) {
      // Silently return success to mislead spambots
      return NextResponse.json({
        success: true,
        message: "Inquiry received successfully.",
      });
    }

    // 3. Extract & sanitize fields
    const name = sanitizeText(body.name || body.fullName);
    const email = sanitizeText(body.email);
    const phone = sanitizeText(body.phone || body.telephone);
    const inquiryType = sanitizeText(body.inquiryType) || "room_booking";
    const checkIn = sanitizeText(body.checkIn || body.checkInDate);
    const checkOut = sanitizeText(body.checkOut || body.checkOutDate);
    const guests = sanitizeText(body.guests || body.guestCount);
    const roomType = sanitizeText(body.roomType || body.selectedRoom);
    const eventDate = sanitizeText(body.eventDate);
    const attendees = sanitizeText(body.attendees || body.eventAttendees);
    const eventType = sanitizeText(body.eventType);
    const message = sanitizeText(body.message || body.specialRequests);

    // 4. Server-side validations
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name (2-100 characters)." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || phone.length < 7 || phone.length > 25) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid phone or WhatsApp number." },
        { status: 400 }
      );
    }

    // Inquiry-specific validation
    const isAccommodation = inquiryType === "room_booking";
    const isEvent = ["small_party", "meeting", "gathering", "other_event"].includes(inquiryType);

    if (isAccommodation && checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      if (isNaN(inDate.getTime()) || isNaN(outDate.getTime()) || outDate <= inDate) {
        return NextResponse.json(
          { success: false, error: "Check-out date must be after check-in date." },
          { status: 400 }
        );
      }
    }

    // Map human-readable label
    const inquiryLabels: Record<string, string> = {
      room_booking: "Room Booking Inquiry",
      general_inquiry: "General Inquiry",
      small_party: "Small Party / Celebration Inquiry",
      meeting: "Meeting / Business Gathering Inquiry",
      gathering: "Private Gathering Inquiry",
      other_event: "Custom Event Inquiry",
    };
    const humanInquiryType = inquiryLabels[inquiryType] || "General Inquiry";

    // 5. Construct Email
    const recipientEmail =
      process.env.CONTACT_EMAIL || process.env.GMAIL_USER || "isararesidence@gmail.com";
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    // Build plain text version
    let plainText = `New Inquiry from ISARA Residence Website\n`;
    plainText += `-----------------------------------------\n`;
    plainText += `Inquiry Type: ${humanInquiryType}\n`;
    plainText += `Guest Name:   ${name}\n`;
    plainText += `Email:        ${email}\n`;
    plainText += `Phone/WA:     ${phone}\n\n`;

    if (isAccommodation) {
      if (checkIn) plainText += `Check-in:       ${checkIn}\n`;
      if (checkOut) plainText += `Check-out:      ${checkOut}\n`;
      if (guests) plainText += `Guests:         ${guests}\n`;
      if (roomType) plainText += `Preferred Room: ${roomType}\n`;
    }

    if (isEvent) {
      if (eventDate) plainText += `Event Date:     ${eventDate}\n`;
      if (attendees) plainText += `Estimated Size: ${attendees} attendees\n`;
      if (eventType) plainText += `Event Category: ${eventType}\n`;
    }

    if (message) {
      plainText += `\nSpecial Requests / Message:\n${message}\n`;
    }

    plainText += `\nSubmitted from IP: ${ip} at ${new Date().toISOString()}\n`;

    // Build professional HTML version
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; background-color: #f7faf8; border-radius: 12px; border: 1px solid #d1e3dd; color: #1e2d2a;">
        <div style="text-align: center; border-bottom: 2px solid #558278; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #263936; font-size: 24px; letter-spacing: 1px;">ISARA RESIDENCE</h2>
          <p style="margin: 4px 0 0 0; color: #558278; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Guest House & Accommodation • Polonnaruwa, Sri Lanka</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e3ebe8; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #36544e; border-bottom: 1px solid #eef3f1; padding-bottom: 8px; font-size: 18px;">
            ${humanInquiryType}
          </h3>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #558278; width: 140px; font-weight: bold;">Guest Name:</td>
              <td style="padding: 8px 0; color: #1e2d2a;"><strong>${name}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #558278; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #426860; text-decoration: underline;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #558278; font-weight: bold;">Phone / WhatsApp:</td>
              <td style="padding: 8px 0;"><a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="color: #426860; text-decoration: underline;">${phone}</a></td>
            </tr>

            ${
              isAccommodation
                ? `
              ${checkIn ? `<tr><td style="padding: 8px 0; color: #558278; font-weight: bold;">Check-in:</td><td style="padding: 8px 0;">${checkIn}</td></tr>` : ""}
              ${checkOut ? `<tr><td style="padding: 8px 0; color: #558278; font-weight: bold;">Check-out:</td><td style="padding: 8px 0;">${checkOut}</td></tr>` : ""}
              ${guests ? `<tr><td style="padding: 8px 0; color: #558278; font-weight: bold;">Guests:</td><td style="padding: 8px 0;">${guests}</td></tr>` : ""}
              ${roomType ? `<tr><td style="padding: 8px 0; color: #558278; font-weight: bold;">Preferred Room:</td><td style="padding: 8px 0;">${roomType}</td></tr>` : ""}
            `
                : ""
            }

            ${
              isEvent
                ? `
              ${eventDate ? `<tr><td style="padding: 8px 0; color: #558278; font-weight: bold;">Event Date:</td><td style="padding: 8px 0;">${eventDate}</td></tr>` : ""}
              ${attendees ? `<tr><td style="padding: 8px 0; color: #558278; font-weight: bold;">Estimated Size:</td><td style="padding: 8px 0;">${attendees} attendees</td></tr>` : ""}
              ${eventType ? `<tr><td style="padding: 8px 0; color: #558278; font-weight: bold;">Event Category:</td><td style="padding: 8px 0;">${eventType}</td></tr>` : ""}
            `
                : ""
            }
          </table>

          ${
            message
              ? `
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #eef3f1;">
              <p style="margin: 0 0 6px 0; color: #558278; font-weight: bold; font-size: 14px;">Special Requests / Message:</p>
              <div style="background-color: #f8faf9; padding: 12px; border-radius: 6px; font-size: 14px; line-height: 1.5; color: #2d4540; white-space: pre-wrap;">${message}</div>
            </div>
          `
              : ""
          }
        </div>

        <div style="text-align: center; font-size: 12px; color: #749f96; border-top: 1px solid #d1e3dd; padding-top: 12px;">
          <p style="margin: 0;">Sent automatically from the ISARA Residence official website contact system.</p>
          <p style="margin: 4px 0 0 0;">Direct reply will be delivered to <strong>${email}</strong></p>
        </div>
      </div>
    `;

    // 6. Send via Nodemailer if SMTP configured
    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      await transporter.sendMail({
        from: `"ISARA Residence Website" <${gmailUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `[ISARA Inquiry] ${humanInquiryType} - ${name}`,
        text: plainText,
        html: htmlBody,
      });

      return NextResponse.json({
        success: true,
        message: "Your inquiry has been sent successfully! We will contact you shortly.",
      });
    } else {
      // Graceful fallback when SMTP credentials are not yet configured in environment variables
      console.warn(
        "Nodemailer notice: GMAIL_USER or GMAIL_APP_PASSWORD is not configured in environment variables. Inquiry logged server-side for owner review."
      );
      console.log("=== INCOMING GUEST INQUIRY ===");
      console.log(plainText);

      return NextResponse.json({
        success: true,
        smtpConfigured: false,
        message:
          "Your inquiry has been received! For instant confirmation, you can also send this inquiry directly via WhatsApp.",
      });
    }
  } catch (error: unknown) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to send your inquiry at this moment. Please reach out to us directly via WhatsApp at +94 70 680 1910.",
      },
      { status: 500 }
    );
  }
}
