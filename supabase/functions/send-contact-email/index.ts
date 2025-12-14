import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  memberName: string;
  memberEmail?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, memberName, memberEmail }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, memberName, memberEmail });

    // Validate required fields
    if (!name || !email || !message || !memberName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to the team member (or fallback to info@ozoneinsurance.com)
    const recipientEmail = memberEmail || "info@ozoneinsurance.com";
    
    const emailResponse = await resend.emails.send({
      from: "Ozone Insurance <onboarding@resend.dev>",
      to: [recipientEmail],
      reply_to: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">New Contact Form Submission</h2>
          <p>Hello ${memberName.split(" ")[0]},</p>
          <p>You have received a new inquiry from the Ozone Insurance website:</p>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>Please respond to this inquiry at your earliest convenience.</p>
          <p>Best regards,<br>Ozone Insurance Website</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Also send a confirmation email to the sender
    await resend.emails.send({
      from: "Ozone Insurance <onboarding@resend.dev>",
      to: [email],
      subject: `Thank you for contacting Ozone Insurance`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Thank You for Contacting Us</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to ${memberName} at Ozone Insurance. We have received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>If you have any urgent questions, please call us at <a href="tel:+18336969663">1-833-MY-OZONE (833-696-9663)</a>.</p>
          <p>Best regards,<br>The Ozone Insurance Team</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
