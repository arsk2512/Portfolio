import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "abdrehmankh2@gmail.com", // your email
      subject: `New Message from ${body.name}`,
      text: `
        Name: ${body.name}
        Email: ${body.email}
        Subject: ${body.subject}
        Message: ${body.message}
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
