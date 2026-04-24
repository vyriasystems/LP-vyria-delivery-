import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

type ContactPayload = {
  nome?: string;
  whatsapp?: string;
  loja?: string;
  mensagem?: string;
};

function buildHtml(payload: Required<ContactPayload>) {
  return `
    <h2>Novo contato via Landing Vyria</h2>
    <p><strong>Nome:</strong> ${payload.nome}</p>
    <p><strong>WhatsApp:</strong> ${payload.whatsapp}</p>
    <p><strong>Loja:</strong> ${payload.loja || "-"}</p>
    <p><strong>Mensagem:</strong> ${payload.mensagem || "-"}</p>
  `;
}

async function sendWithResend(to: string, payload: Required<ContactPayload>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return false;
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    subject: "Novo contato da landing Vyria",
    html: buildHtml(payload)
  });
  return true;
}

async function sendWithNodemailer(to: string, payload: Required<ContactPayload>) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM_EMAIL || user;
  if (!host || !user || !pass || !from) return false;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  await transporter.sendMail({
    from,
    to,
    subject: "Novo contato da landing Vyria",
    html: buildHtml(payload)
  });
  return true;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const payload: Required<ContactPayload> = {
      nome: String(body.nome || "").trim(),
      whatsapp: String(body.whatsapp || "").trim(),
      loja: String(body.loja || "").trim(),
      mensagem: String(body.mensagem || "").trim()
    };

    if (!payload.nome || !payload.whatsapp) {
      return NextResponse.json({ ok: false, error: "Campos obrigatorios ausentes." }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      return NextResponse.json({ ok: false, error: "ADMIN_EMAIL nao configurado." }, { status: 500 });
    }

    const sentByResend = await sendWithResend(adminEmail, payload);
    if (!sentByResend) {
      const sentBySMTP = await sendWithNodemailer(adminEmail, payload);
      if (!sentBySMTP) {
        return NextResponse.json(
          { ok: false, error: "Servico de email nao configurado (Resend/Nodemailer)." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Erro interno ao enviar contato." }, { status: 500 });
  }
}
