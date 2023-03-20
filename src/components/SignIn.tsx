import styles from "@/styles/login.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useFormik } from "formik";
import LoginValidate from "@/lib/formValidate";

export default function SignIn({
  setShowSignIn,
}: {
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate: LoginValidate,
    onSubmit,
  });

  async function onSubmit(values: { email: string; password: string }) {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
      redirect: false,
    });
  }

  return (
    <div className={styles.signup}>
      <div className={styles.zapper}>
        <Image src="zapper.svg" alt="zapper" width={24} height={24} />
        <p>zappersss</p>
      </div>
      <h1 className={styles.headline}>Welcome Back</h1>
      <p className={styles.subHeadline}>
        Let’s get started with your 30 day free trial
      </p>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.input}>
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
          Log in
        </button>
      </form>
      <button
        className={styles.google}
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <FcGoogle /> Sign in with Google
      </button>

      <p className={styles.already}>
        Don&apos;t have an account ?{" "}
        <button onClick={() => setShowSignIn(false)}>Sign up</button>
      </p>
    </div>
  );
}
