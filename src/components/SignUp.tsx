import styles from "@/styles/login.module.scss";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useFormik } from "formik";
import LoginValidate from "@/lib/formValidate";
import { hash } from "bcryptjs";
import {
  getDoc,
  doc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  addDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export default function SignUp({
  setShowSignIn,
}: {
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    // validate: LoginValidate,
    onSubmit,
  });

  async function onSubmit(values: {
    username: string;
    email: string;
    password: string;
  }) {
    const q = query(
      collection(db, "users"),
      where("email", "==", values.email)
    );
    getDocs(q).then(async (querySnapshot) => {
      if (querySnapshot.size > 0) {
        console.log("email already exists");
      } else {
        await hash(values.password, 12)
          .then(async (hashedPassword) => {
            const newUser = {
              username: values.username,
              email: values.email,
              password: hashedPassword,
              createdAt: serverTimestamp(),
            };
            await setDoc(doc(db, "users", newUser.email), newUser);
          })
          .finally(() => {
            signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: false,
            }).then((res) => {
              if (res?.status === 200) {
                router.push("/dashboard");
              }
            });
          });
      }
    });
  }

  return (
    <div className={styles.signup}>
      <div className={styles.zapper}>
        <Image src="zapper.svg" alt="zapper" width={24} height={24} />
        <p>zapper</p>
      </div>
      <h1 className={styles.headline}>Create an account</h1>
      <p className={styles.subHeadline}>
        Let’s get started with your 30 day free trial
      </p>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Name"
            {...formik.getFieldProps("username")}
          />
          <input
            type="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className={` ${
              formik.errors.email && formik.touched.email ? styles.error : ""
            }
                `}
          />
          <input
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
            className={` ${
              formik.errors.password && formik.touched.password
                ? styles.error
                : ""
            }
                `}
          />
        </div>
        <button className={styles.create} type="submit">
          Create account
        </button>
      </form>
      <button
        className={styles.google}
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <FcGoogle /> Sign in with Google
      </button>
      <p className={styles.already}>
        Already have an account ?{" "}
        <button onClick={() => setShowSignIn(true)}>Log in</button>
      </p>
    </div>
  );
}
