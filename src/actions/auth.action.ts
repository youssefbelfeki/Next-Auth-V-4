"use server";
import { signIn, signOut } from "@/auth";
import { generateVerificationToken } from "@/utils/generateToken";
import { prisma } from "@/utils/prisma";
import { LoginSchema, RegisterSchema } from "@/utils/validationSchema";
import * as bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

type LoginDto = z.infer<typeof LoginSchema>;
type registerDto = z.infer<typeof RegisterSchema>;

export const loginAction = async (data: LoginDto) => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid Credential" };
  }
  const { email, password } = validation.data;

  const user = await prisma.user.findUnique({where: {email}})
  if (!user || !user.email || !user.password) {
    return { success: false, message: "Invalid Credential" };
  }

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(email)
    //@Todo -> send email
    return { success: true, message: "Email Sent , Verify Your Account" };
  }
  try {
    await signIn("credentials", { email, password, redirectTo: "/profile" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password" };
        default:
          return { success: false, message: "Something Wrong" };
      }
    }
    throw error;
  }
  return { success: true, message: "Logged Successfully" };
};

export const registerAction = async (data: registerDto) => {
  const validation = RegisterSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: "Invalid Credentials" };

  const { name, password, email } = validation.data;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) return { success: false, message: "User already exist" };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    const verificationToken = await generateVerificationToken(email)
    
    return { success: true, message: "Email Sent , Verify Your Account" };

  } catch (error) {
    return {
      success: false,
      message: "Something went wrong, please try again ",
    };
  }
};

export const logoutAction = async () => {
  await signOut();
};
