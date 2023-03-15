import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDoc, query, where } from "firebase/firestore";
// import * as firestoreFunctions from "firebase/firestore";
import admin from "firebase-admin";

export default NextAuth({
  session: {
    strategy: "database",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const q = query(
          collection(db, "users"),
          where("email", "==", credentials.email)
        );
        const querySnapshot = await getDoc(q);
        const user = querySnapshot.data();

        if (user) {
          if (user.password === credentials.password) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

    credential: admin.credential.cert({
      project_id: process.env.CREDENTIALS_PROJECT_ID,
      private_key_id: process.env.CREDENTIALS_PRIVATE_KEY_ID,
      private_key: process.env.CREDENTIALS_PRIVATE_KEY,
      client_email: process.env.CREDENTIALS_CLIENT_EMAIL,
      client_id: process.env.CREDENTIALS_CLIENT_ID,
      auth_uri: process.env.CREDENTIALS_AUTH_URI,
      token_uri: process.env.CREDENTIALS_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.CREDENTIALS_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CREDENTIALS_CLIENT_X509_CERT_URL,
    }),
  }),
});
