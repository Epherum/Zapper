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
        // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },

        //   body: JSON.stringify(credentials.email),
        // });

        // const user = await res.json();
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          return user;
        } else {
          return null;
        }

        if (res.ok && user) {
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
