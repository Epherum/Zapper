import styles from "@/styles/dashboard.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

interface DashboardProjectProps {
  title: string;
  tasks: number;
  overdue: number;
  date: string;
}

export default function DashboardProject({
  title,
  tasks,
  overdue,
  date,
}: DashboardProjectProps) {
  const router = useRouter();
  return (
    <Link href="/Projects">
      <div className={styles.projectsItem}>
        <div className={styles.rightProjectSide}>
          {router.pathname === "/" ? (
            <p className={styles.projectLetters}>
              {title
                .split(" ")
                .map((word) => word[0].toUpperCase())
                .join("")}
            </p>
          ) : (
            ""
          )}

          <div className={styles.projectInfo}>
            <p>{title}</p>
            <p>
              {tasks} tasks <span>•</span> {overdue} overdue
            </p>
          </div>
        </div>
        <div className={styles.leftProjectSide}>
          <p>3 days left</p>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  );
}
