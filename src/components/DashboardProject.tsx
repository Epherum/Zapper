import styles from "@/styles/dashboard.module.scss";
import { useRouter } from "next/router";
import Link from "@/components/Link";
import Image from "next/image";
import moment from "moment";
import { motion } from "framer-motion";
interface DashboardProjectProps {
  project: {
    name: string;
    tasks: number;
    overdue: number;
    createdAt: { seconds: number; nanoseconds: number };
    targetDate: string;
  };
}

export default function DashboardProject({ project }: DashboardProjectProps) {
  const { name, createdAt, targetDate } = project;
  const date = `${moment.unix(createdAt.seconds).format("MMM DD")} - ${moment(
    targetDate
  ).format("MMM DD")}`;
  const router = useRouter();
  return (
    <Link href={`/dashboard/projects/${name}`}>
      <motion.div
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.98 }}
        className={styles.projectsItem}
      >
        <div className={styles.leftProjectSide}>
          {router.pathname === "/dashboard" ? (
            <p className={styles.projectLetters}>
              {name
                .split(" ")
                .map((word) => word[0].toUpperCase())
                .join("")}
            </p>
          ) : (
            ""
          )}

          <div className={styles.projectInfo}>
            <p>{name}</p>
            <p>
              {13} tasks <span>•</span> {3} overdue
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
      </motion.div>
    </Link>
  );
}
