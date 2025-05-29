"use server"
import { generateResetPasswordToken } from "@/utils/generateToken";
import { sendResetPasswordToken, sendVerificationToken } from "@/utils/mail";
import { prisma } from "@/utils/prisma";
import { ActionType } from "@/utils/type";
import { ForgotPasswordSchema } from "@/utils/validationSchema";
import { z } from "zod";

export const forgotPAsswordAction = async (
  props: z.infer<typeof ForgotPasswordSchema>
) : Promise<ActionType> => {
  try {
    const validation = ForgotPasswordSchema.safeParse(props);
    if (!validation.success)
      return { success: false, message: validation.error.errors[0].message };
    const { email } = validation.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { success: false, message: "User not found" };
    const restPasswordToken = await generateResetPasswordToken(email);
    await sendResetPasswordToken(
      restPasswordToken.email,
      restPasswordToken.token
    );
    return {
      success: true,
      message: "Reset password link sent. check your email",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "something went wrong" };
  }
};
