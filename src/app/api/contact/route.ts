import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
    try {
        // Debug logging
        console.log("Environment check:");
        console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

        const body = await request.json();
        const { name, restaurant, phone, city, message } = body;

        // Validation
        if (!name || !restaurant || !phone || !city || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if RESEND_API_KEY is configured
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not configured");
            console.log("Form submission received:", { name, restaurant, phone, city, message });

            // For development: Still return success but log to console
            return NextResponse.json({
                success: true,
                message: "Form received (email not configured yet)"
            });
        }

        // Initialize Resend with the API key
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send email notification using Resend
        const { data, error } = await resend.emails.send({
            from: "KOTA Contact Form <onboarding@resend.dev>",
            to: process.env.NOTIFICATION_EMAIL || "your@email.com",
            subject: `New Demo Request from ${restaurant}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000;">New Demo Request</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Restaurant:</strong> ${restaurant}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This email was sent from the KOTA contact form.</p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json(
                { error: error.message || "Failed to send email via Resend" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Email sent successfully",
            id: data?.id
        });

    } catch (error) {
        console.error("Error processing contact form:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
