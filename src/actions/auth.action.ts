
"use server";
import { prisma } from "@/utils/prisma";
import { LoginSchema, RegisterSchema } from "@/utils/validationSchema";
import * as bcrypt from "bcryptjs";
import { z } from "zod";

type LoginDto = z.infer<typeof LoginSchema>;
type registerDto = z.infer<typeof RegisterSchema>;

export const loginAction = async (data: LoginDto) => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid Credentials" };
  }
  console.log("data: ", data);
  return { success: "Logged Successfully" };
};

export const registerAction = async (data: registerDto) => {
  const validation = RegisterSchema.safeParse(data);
  if (!validation.success) return { success: false, message: "Invalid Credentials" };

  const { name, password, email } = validation.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) return { success: false, message: "User already exist" };
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });
  return { success: true, message: "Logged Successfully" };
};
