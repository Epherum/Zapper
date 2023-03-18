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
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(credentials.email),
        });

        const user = await res.json();

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
//adapters dont work with credentials provider :(
// adapter: FirestoreAdapter({
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

//   credential: admin.credential.cert({
//     project_id: process.env.CREDENTIALS_PROJECT_ID,
//     private_key_id: process.env.CREDENTIALS_PRIVATE_KEY_ID,
//     private_key: process.env.CREDENTIALS_PRIVATE_KEY,
//     client_email: process.env.CREDENTIALS_CLIENT_EMAIL,
//     client_id: process.env.CREDENTIALS_CLIENT_ID,
//     auth_uri: process.env.CREDENTIALS_AUTH_URI,
//     token_uri: process.env.CREDENTIALS_TOKEN_URI,
//     auth_provider_x509_cert_url:
//       process.env.CREDENTIALS_AUTH_PROVIDER_X509_CERT_URL,
//     client_x509_cert_url: process.env.CREDENTIALS_CLIENT_X509_CERT_URL,
//   }),
// }),

//   // if (user) {
//   //   const isValid = await compare(credentials.password, user.password);
//   //   if (isValid) {
//   //     return user;
//   //   }
//   // }
//   // return null;
// },
// import { FirestoreAdapter } from "@next-auth/firebase-adapter";
// import admin from "firebase-admin";
