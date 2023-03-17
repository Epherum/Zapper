import Link from "@/components/Link";
import styles from "@/styles/login.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session);
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
  const handleSignin = async (e: any) => {
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

  return (
    <section className={styles.login}>
      {!session && (
        <div className={styles.leftSection}>
          <div className={styles.zapper}>
            <img src="zapper.svg" alt="zapper" />
            <p>zapper</p>
          </div>
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
                {/* <input type="email" placeholder="Email" /> */}
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
              {/* @ts-ignore */}
              <button
                className={styles.google}
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                Sign in with Google
              </button>
            </div>

            <div className={styles.demo}>
              <div className={styles.demoText}>
                <p className={styles.lol}>_____________</p>
                <p>Or Demo Login as</p>
                <p className={styles.lol}>_____________</p>
              </div>
              <div className={styles.roles}>
                <button>
                  <Link href="/dashboard">Admin</Link>
                </button>
                <button>
                  <Link href="/dashboard">Project Manager</Link>
                </button>
                <button>
                  <Link href="/dashboard">Developer</Link>
                </button>
                <button>
                  <Link href="/dashboard">Submitter</Link>
                </button>
              </div>
            </div>
            <p className={styles.already}>
              Already have an account ? <button>Log in</button>
            </p>
          </div>
          {/* <div className={styles.rightSection}>
          <Image src={zapper} alt="zapper" />
          <Image src={michael} alt="review" />
          <p>
            Who doesn't love tracked? It's like having a personal stalke your
            issues. And let me tell II never be lonely again, you, with this app,
            your i s
          </p>
          <p>Michael Scott</p>
          <p>CEO, Dunder Mifflin</p>
          <p>-&gt;</p>
          <p>&lt;-</p>
        </div> */}
        </div>
      )}
      {session && (
        <>
          <h1>signed in as {session?.user?.email}</h1>
          <button onClick={() => signOut()}>sign out</button>
        </>
      )}
    </section>
  );
}
