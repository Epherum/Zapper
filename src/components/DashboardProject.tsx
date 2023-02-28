import styles from "@/styles/dashboard.module.scss";
import { useRouter } from "next/router";
import Link from "@/components/Link";
import Image from "next/image";

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
        <div className={styles.leftProjectSide}>
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
        <div className={styles.rightProjectSide}>
          <div className={styles.members}>
            {[
              "/profile1.png",
              "/profile2.png",
              "/profile.png",
              "/profile.png",
            ].map((item, index) => (
              <Image
                key={index}
                src={item}
                width={35}
                height={35}
                alt="Picture of the author"
                className={styles.member}
              />
            ))}
          </div>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  );
}
