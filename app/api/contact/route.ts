import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json(
      { error: "Please write a slightly longer message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "aansari430@gmail.com";
  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json({ ok: true, fallback: true });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email.trim(),
      subject: `Portfolio message from ${name.trim()}`,
      text: `${message.trim()}\n\nFrom: ${name.trim()} <${email.trim()}>`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Email service failed. Try again or use the email link." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, fallback: false });
}
