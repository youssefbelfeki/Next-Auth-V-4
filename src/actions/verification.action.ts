"use server";

import { prisma } from "@/utils/prisma";

export const verifyingEmailToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    if (!verificationToken)
      return { success: false, message: "Token not found" };
    const isExpired = new Date(verificationToken.expires) < new Date();
    if (!isExpired) return { success: false, message: "Token expired" };
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.email },
    });
    if (!user) return { success: false, message: "user expired" };

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
    return {
      success: true,
      message: "Your email address was successfully Verified",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};
