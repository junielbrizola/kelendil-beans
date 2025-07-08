import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false }
});

export async function sendPasswordResetEmail(to: string, link: string) {
  await transporter.sendMail({
    from: '"Kelendil Beans" <no-reply@kelendil.com>',
    to,
    subject: 'Redefinição de Senha',
    html: `
      <p>Você solicitou redefinição de senha. Clique no link abaixo:</p>
      <p><a href="${link}">${link}</a></p>
      <p>Se não foi você, ignore este email.</p>
    `
  });
}
