import styles from "@/styles/login.module.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import axios from "axios";

type RoleShape = {
  key: string;
  name: string;
  description: string;
  capabilities?: string[];
};

export default function SignUp({
  setShowSignIn,
  roles,
}: {
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  roles: RoleShape[];
}) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: roles[0]?.key || "admin",
    },
    enableReinitialize: true,
    onSubmit,
  });

  async function onSubmit(values: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) {
    try {
      await axios.post("/api/users", {
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
      });

      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.formPanel}>
      <div className={styles.panelHeader}>
        <p className={styles.kicker}>Create account</p>
        <h2 className={styles.titleLarge}>Set up your workspace access</h2>
        <p className={styles.hint}>
          Choose a role to tailor your dashboard. We’ll wire granular permissions soon.
        </p>
      </div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label className={styles.field}>
          <div className={styles.labelRow}>
            <span>Name</span>
          </div>
          <input
            type="text"
            placeholder="Frances Hall"
            {...formik.getFieldProps("username")}
            className={styles.inputControl}
          />
        </label>
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
        <label className={styles.field}>
          <div className={styles.labelRow}>
            <span>Role</span>
            <span className={styles.optionalTag}>Optional</span>
          </div>
          <div className={styles.selectWrapper}>
            <select
              {...formik.getFieldProps("role")}
              className={styles.selectControl}
            >
              {roles.map((role) => (
                <option value={role.key} key={role.key}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <p className={styles.helper}>
            Roles don’t restrict access yet—they help personalize onboarding today.
          </p>
        </label>

        <button className={styles.primaryButton} type="submit">
          Create account
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
        <span>Already have an account?</span>{" "}
        <button onClick={() => setShowSignIn(true)}>Log in</button>
      </p>
    </div>
  );
}
