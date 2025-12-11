import styles from "@/styles/login.module.scss";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";

export default function SignIn({
  setShowSignIn,
}: {
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
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
    <div className={styles.formPanel}>
      <div className={styles.panelHeader}>
        <p className={styles.kicker}>Sign in</p>
        <h2 className={styles.titleLarge}>Welcome back</h2>
        <p className={styles.hint}>
          Pick up where you left off. Your dashboard, filters, and last open project will
          be right here.
        </p>
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

        <button className={styles.primaryButton} type="submit">
          Log in
        </button>
      </form>
      <button
        className={styles.oauthButton}
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        type="button"
      >
        <FcGoogle /> Sign in with Google
      </button>

      <p className={styles.switcher}>
        <span>Need an account?</span>{" "}
        <button onClick={() => setShowSignIn(false)}>Create one</button>
      </p>
    </div>
  );
}
