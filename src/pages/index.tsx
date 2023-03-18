import styles from "@/styles/login.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [roleName, setRoleName] = useState("Admin");
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <section className={styles.login}>
      {!session && (
        <>
          <div className={styles.leftSection}>
            {showSignIn && <SignIn setShowSignIn={setShowSignIn} />}
            {!showSignIn && <SignUp setShowSignIn={setShowSignIn} />}
          </div>

          {/* <p className={styles.or}>Or</p> */}

          <div className={styles.rightSide}>
            <h1 className={styles.demoText}>Demo login as</h1>
            <div className={styles.roles}>
              {["Admin", "Project Manager", "Developer", "Submitter"].map(
                (role, index) => (
                  <button
                    key={index}
                    className={role === `${roleName}` ? styles.active : ""}
                    onClick={() => setRoleName(role)}
                  >
                    {role}
                  </button>
                )
              )}
            </div>
            <div className={styles.demoRoles}>
              <div className={styles.demoRole}>
                <h4>Management</h4>
                <p>
                  manages the task tracker system, creates and manages projects,
                  and assigns roles to team members.
                </p>
              </div>
              <div className={styles.demoRole}>
                <h4>User Accounts</h4>
                <p>
                  creates user accounts and manages permissions for team
                  members.
                </p>
              </div>
              <div className={styles.demoRole}>
                <h4>Project Oversight</h4>
                <p>
                  oversees the progress of projects and ensures that the task
                  tracker system is functioning properly.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                signIn("credentials", {
                  username: "123",
                  password: "123",
                  redirect: false,
                  callbackUrl: "/dashboard",
                });
              }}
              className={styles.continue}
            >
              Continue as Admin
            </button>
          </div>
        </>
      )}
      {session && (
        <>
          <h1>Redirecting...</h1>
        </>
      )}
    </section>
  );
}
