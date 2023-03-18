import Link from "@/components/Link";
import styles from "@/styles/login.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [roleName, setRoleName] = useState("Admin");
  const [showSignIn, setShowSignIn] = useState(false);
  const [authState, setAuthState] = useState({
    username: "",
    password: "",
  });
  const handleAuthState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthState((authstate) => ({
      ...authState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSignin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(authState);
    signIn("credentials", {
      ...authState,
      redirect: false,
    })
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
            <div className={styles.zapper}>
              <img src="zapper.svg" alt="zapper" />
              <p>zapper</p>
            </div>
            {/* sign in */}
            {showSignIn && (
              <div className={styles.signup}>
                <h1 className={styles.headline}>Welcome Back</h1>
                <p className={styles.subHeadline}>
                  Let’s get started with your 30 day free trial
                </p>
                <div className={styles.form}>
                  <div className={styles.input}>
                    <input
                      type="email"
                      placeholder="Email"
                      name="username"
                      onChange={handleAuthState}
                      value={authState.username}
                    />
                    <input
                      type="password"
                      placeholder="Password
                  
                  "
                      name="password"
                      onChange={handleAuthState}
                      value={authState.password}
                    />
                  </div>
                  <button className={styles.create} onClick={handleSignin}>
                    Log in
                  </button>
                  <button
                    className={styles.google}
                    onClick={() =>
                      signIn("google", { callbackUrl: "/dashboard" })
                    }
                  >
                    <FcGoogle /> Sign in with Google
                  </button>
                </div>

                <p className={styles.already}>
                  Don't have an account ?{" "}
                  <button onClick={() => setShowSignIn(false)}>Sign up</button>
                </p>
              </div>
            )}
            {/* sign up */}
            {!showSignIn && (
              <div className={styles.signup}>
                <h1 className={styles.headline}>Create an account</h1>
                <p className={styles.subHeadline}>
                  Let’s get started with your 30 day free trial
                </p>
                <div className={styles.form}>
                  <div className={styles.input}>
                    <input
                      type="text"
                      name="username"
                      onChange={handleAuthState}
                      value={authState.username}
                      placeholder="Name"
                    />
                    <input type="email" placeholder="Email" />
                    <input
                      type="password"
                      placeholder="Password
                  
                  "
                      name="password"
                      onChange={handleAuthState}
                      value={authState.password}
                    />
                  </div>
                  <button className={styles.create} onClick={handleSignin}>
                    Create account
                  </button>
                  <button
                    className={styles.google}
                    onClick={() =>
                      signIn("google", { callbackUrl: "/dashboard" })
                    }
                  >
                    <FcGoogle /> Sign in with Google
                  </button>
                </div>

                <p className={styles.already}>
                  Already have an account ?{" "}
                  <button onClick={() => setShowSignIn(true)}>Log in</button>
                </p>
              </div>
            )}
          </div>

          {/* <p className={styles.or}>Or</p> */}

          <div className={styles.rightSide}>
            <h1 className={styles.demoText}>Demo login as</h1>
            <div className={styles.roles}>
              {["Admin", "Project Manager", "Developer", "Submitter"].map(
                (role) => (
                  <button
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
