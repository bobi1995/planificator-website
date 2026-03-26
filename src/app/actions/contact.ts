'use server';

import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENTS = [
  'hello@planificator.bg',
  'borislav.stefanov.1995@gmail.com',
];

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const {name, email, company, message} = data;

  if (!name || !email || !message) {
    return {success: false, error: 'missing_fields'};
  }

  const subject = `Demo Request from ${name}${company ? ` (${company})` : ''}`;

  const htmlBody = `
    <h2>New Demo Request</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company || 'Not provided')}</p>
    <hr />
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `;

  const textBody = `New Demo Request\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\n\nMessage:\n${message}`;

  try {
    await resend.emails.send({
      from: 'Planificator <noreply@planificator.bg>',
      to: RECIPIENTS,
      replyTo: email,
      subject,
      html: htmlBody,
      text: textBody,
    });

    return {success: true};
  } catch {
    return {success: false, error: 'send_failed'};
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
