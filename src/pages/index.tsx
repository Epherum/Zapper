import styles from "@/styles/login.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";

const fallbackRoles = [
  {
    key: "admin",
    name: "Admin",
    description: "Owns the workspace and keeps everything organized.",
    capabilities: ["Billing", "Settings", "Team"],
  },
  {
    key: "project_manager",
    name: "Project Manager",
    description: "Plans sprints, prioritizes work, and removes blockers.",
    capabilities: ["Projects", "Backlog", "Reports"],
  },
  {
    key: "developer",
    name: "Developer",
    description: "Builds features, updates status, and collaborates in context.",
    capabilities: ["Tasks", "Comments", "Attachments"],
  },
  {
    key: "submitter",
    name: "Submitter",
    description: "Creates requests and follows along without the noise.",
    capabilities: ["Requests", "Status tracking"],
  },
];

type RoleShape = (typeof fallbackRoles)[number];

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const [showSignIn, setShowSignIn] = useState(true);
  const [roles, setRoles] = useState<RoleShape[]>(fallbackRoles);
  const [selectedRoleKey, setSelectedRoleKey] = useState<string>(
    fallbackRoles[0].key
  );
  const [isQuickLoading, setIsQuickLoading] = useState(false);

  async function signInAdmin() {
    setShowSignIn(true);
    setIsQuickLoading(true);
    try {
      await signIn("credentials", {
        email: "admin@example.com",
        password: "Password123!",
        redirect: false,
        callbackUrl: "/dashboard",
      });
    } finally {
      setIsQuickLoading(false);
    }
  }

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  useEffect(() => {
    async function loadRoles() {
      try {
        const res = await fetch("/api/roles");
        if (!res.ok) throw new Error("Failed to load roles");
        const data = await res.json();
        if (Array.isArray(data.roles) && data.roles.length > 0) {
          setRoles(data.roles);
          if (!data.roles.find((role: RoleShape) => role.key === selectedRoleKey)) {
            setSelectedRoleKey(data.roles[0].key);
          }
        }
      } catch (error) {
        setRoles(fallbackRoles);
      }
    }

    loadRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeRole = useMemo(
    () =>
      roles.find((role) => role.key === selectedRoleKey) ||
      roles[0] ||
      fallbackRoles[0],
    [roles, selectedRoleKey]
  );

  if (session) {
    return (
      <section className={styles.login}>
        <div className={styles.shell}>
          <div className={styles.authCard}>
            <div className={styles.panelHeader}>
              <p className={styles.kicker}>Redirecting</p>
              <h2 className={styles.titleLarge}>Taking you to your dashboard</h2>
              <p className={styles.hint}>
                We found an active session. Hold tight while we load your workspace.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.login}>
      <div className={styles.shell}>
        <div className={styles.hero}>
          <div className={styles.brand}>
            <div className={styles.brandIcon}>⚡</div>
            <div className={styles.brandCopy}>
              <p className={styles.brandName}>Zapper</p>
              <p className={styles.mutedText}>Ship calmly with a structured workspace.</p>
            </div>
          </div>
          <h1 className={styles.heroTitle}>
            One place to track every deliverable with momentum.
          </h1>

          <div className={styles.quickLogin}>
            <button
              onClick={signInAdmin}
              className={styles.quickButton}
              disabled={isQuickLoading}
              aria-busy={isQuickLoading}
            >
              {isQuickLoading ? "Logging in..." : "Quick login (Admin)"}
            </button>
            <div className={styles.quickText}>
              <p>Jump into a demo workspace with one click.</p>
            </div>
          </div>

          <div className={styles.rolesHeader}>
            <p className={styles.kicker}>Roles</p>
          </div>
          <div className={styles.rolesGrid}>
            {roles.map((role) => (
              <button
                key={role.key}
                className={`${styles.roleCard} ${
                  role.key === activeRole.key ? styles.roleCardActive : ""
                }`}
                onClick={() => setSelectedRoleKey(role.key)}
              >
                <div className={styles.roleTitle}>{role.name}</div>
                <p className={styles.roleDescription}>{role.description}</p>
                {role.capabilities?.length ? (
                  <div className={styles.rolePills}>
                    {role.capabilities.slice(0, 3).map((item: string) => (
                      <span key={item} className={styles.pill}>
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.authCard}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${
                showSignIn ? styles.tabButtonActive : ""
              }`}
              onClick={() => setShowSignIn(true)}
            >
              Sign in
            </button>
            <button
              className={`${styles.tabButton} ${
                !showSignIn ? styles.tabButtonActive : ""
              }`}
              onClick={() => setShowSignIn(false)}
            >
              Create account
            </button>
          </div>

          {showSignIn && <SignIn setShowSignIn={setShowSignIn} />}
          {!showSignIn && (
            <SignUp roles={roles} setShowSignIn={setShowSignIn} />
          )}
        </div>
      </div>
    </section>
  );
}
