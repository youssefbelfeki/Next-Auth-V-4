"use server";
import { LoginSchema, RegisterSchema } from "@/app/utils/validationSchema";
import { z } from "zod";

type LoginDto = z.infer<typeof LoginSchema>;
type registerDto = z.infer<typeof RegisterSchema>;

export const loginAction = async (data: LoginDto) => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid Credentials"};
  }
  console.log("data: ", data);
  return { success: "Logged Successfully" };
};


export const registerAction = async (data: registerDto) => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid Credentials"};
  }
  console.log("data: ", data);
  return { success: "Logged Successfully" };
};
