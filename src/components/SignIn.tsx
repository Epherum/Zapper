import styles from "@/styles/login.module.scss";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export default function SignIn({
  setShowSignIn,
}: {
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [authAction, setAuthAction] = useState<"credentials" | "google" | null>(
    null
  );
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  async function onSubmit(values: { email: string; password: string }) {
    setAuthAction("credentials");
    try {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/dashboard",
        redirect: false,
      });
    } finally {
      setAuthAction(null);
    }
  }

  return (
    <div className={styles.formPanel}>
      <div className={styles.panelHeader}>
        <p className={styles.kicker}>Sign in</p>
        <h2 className={styles.titleLarge}>Welcome back</h2>
      </div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label className={styles.field}>
          <div className={styles.labelRow}>
            <span>Email</span>
          </div>
          <input
            type="email"
            placeholder="you@company.com"
            {...formik.getFieldProps("email")}
            className={`${styles.inputControl} ${
              formik.errors.email && formik.touched.email ? styles.error : ""
            }`}
          />
        </label>
        <label className={styles.field}>
          <div className={styles.labelRow}>
            <span>Password</span>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            {...formik.getFieldProps("password")}
            className={`${styles.inputControl} ${
              formik.errors.password && formik.touched.password
                ? styles.error
                : ""
            }`}
          />
        </label>

        <button
          className={styles.primaryButton}
          type="submit"
          disabled={authAction !== null}
          aria-busy={authAction === "credentials"}
        >
          {authAction === "credentials" ? "Signing in..." : "Log in"}
        </button>
      </form>
      <button
        className={styles.oauthButton}
        onClick={async () => {
          setAuthAction("google");
          try {
            await signIn("google", { callbackUrl: "/dashboard" });
          } finally {
            setAuthAction(null);
          }
        }}
        type="button"
        disabled={authAction !== null}
        aria-busy={authAction === "google"}
      >
        <FcGoogle />{" "}
        {authAction === "google" ? "Signing in..." : "Sign in with Google"}
      </button>

      <p className={styles.switcher}>
        <span>Need an account?</span>{" "}
        <button onClick={() => setShowSignIn(false)}>Create one</button>
      </p>
    </div>
  );
}
