import Link from "@/components/Link";
import styles from "@/styles/login.module.scss";
import Image from "next/image";
import michael from "../../public/michael.jpg";
import zapper from "../../public/zapper.svg";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Login() {
  const { data: session, status } = useSession();
  console.log(session);
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
            <form>
              <div className={styles.input}>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
              </div>
              <button className={styles.create}>
                <Link href="/dashboard">Create account</Link>
              </button>
              {/* @ts-ignore */}
              <button className={styles.google} onClick={signIn}>
                Sign in with Google
              </button>
            </form>

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
