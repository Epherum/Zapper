import styles from "@/styles/dashboard.module.scss";
import { useState } from "react";
import { CgArrowsExpandRight } from "react-icons/cg";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import Link from "@/components/Link";
import Image from "next/image";
import moment from "moment";

interface TaskProps {
  task: {
    title: string;
    priority: string;
    description: string;
    createdAt: { seconds: number; nanoseconds: number };
    targetDate: string;
  };
  expandedFirst?: boolean;
}

export default function Task({ task, expandedFirst = false }: TaskProps) {
  const { title, priority, description, createdAt, targetDate } = task;
  const [expanded, setExpanded] = useState(expandedFirst);

  const date = `${moment.unix(createdAt.seconds).format("MMM DD")} - ${moment(
    targetDate
  ).format("MMM DD")}`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`${styles.task} ${expanded ? styles.expanded : ""}`}
      onClick={expanded ? () => {} : handleExpandClick}
    >
      <div className={styles.taskHeadline}>
        <div>
          <div className={styles.taskID}>
            <p>
              <span>{"ID LG-12"}</span>
            </p>
          </div>
          <div className={styles.taskName}>
            <p>{title}</p>
          </div>
          <div
            className={`${styles.taskPriority}  ${
              expanded ? styles.expandedtaskPriority : ""
            }`}
            style={
              priority === "high"
                ? { backgroundColor: "#FF8080" }
                : priority === "medium"
                ? { backgroundColor: "#FFE0B2" }
                : { backgroundColor: "#DFFFDE" }
            }
          >
            <p>{priority}</p>
          </div>
        </div>
        {expanded ? (
          <Link href="/dashboard/projects/missguided/LG-12">
            <CgArrowsExpandRight />
          </Link>
        ) : (
          // <button onClick={handleExpandClick}>
          // </button>
          <button onClick={handleExpandClick}>
            <MdExpandMore />
          </button>
        )}
      </div>
      {expanded && (
        <>
          <div className={styles.taskDescription}>
            <p>{description}</p>
          </div>
          <div className={styles.taskRow}>
            <div className={styles.rowInfo}>
              <p
                className={styles.taskPriority}
                style={
                  priority === "high"
                    ? { backgroundColor: "#FF8080" }
                    : priority === "medium"
                    ? { backgroundColor: "#FFE0B2" }
                    : { backgroundColor: "#DFFFDE" }
                }
              >
                {priority}
              </p>
              <div className={styles.members}>
                {["/profile1.png", "/profile2.png"].map((item, index) => (
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
              <p className={styles.taskDate}>{date}</p>
            </div>
            <button onClick={handleExpandClick}>
              <MdExpandLess />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
