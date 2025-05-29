import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Send Verification Token
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

// Send Reset Password Token
export const sendResetPasswordToken = async (email: string, token: string) => {
  const link = `${process.env.URL}/reset-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<div>
    <a href="${link}"> Click here to reset your password</a>
    </div>`,
  });
};
