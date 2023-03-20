import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export default NextAuth({
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/users/${credentials.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = await res.json();

        if (user) {
          const isValid = await compare(credentials.password, user.password);
          if (isValid) {
            return user;
          }
        }
        return res.status(401).json({ message: "Invalid credentials" });
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
