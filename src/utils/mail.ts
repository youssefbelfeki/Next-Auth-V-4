import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationToken = async (email: string, token: string) => {
  const link = `${process.env.URL}/verify?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<div>
    <a href="${link}"> Click here to verify your email</a>
    </div>`,
  });
};
