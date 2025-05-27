import  GitHub  from 'next-auth/providers/github';
import type { NextAuthConfig } from "next-auth";
import { prisma } from "./utils/prisma";
import * as bcrypt from "bcryptjs";
import { LoginSchema } from "./utils/validationSchema";
import Credentials from "next-auth/providers/credentials";
import Google from 'next-auth/providers/google';

const authConfig = {
  providers: [
    Credentials({
      async authorize(data) {
        const validation = LoginSchema.safeParse(data);
        if (validation.success) {
          const { email, password } = validation.data;
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || !user.password) return null;
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) return user;
        }
        return null;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
} satisfies NextAuthConfig;


export default authConfig;
