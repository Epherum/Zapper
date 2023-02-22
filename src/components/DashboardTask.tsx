import styles from "@/styles/dashboard.module.scss";
import { useState } from "react";
import { CgArrowsExpandRight } from "react-icons/cg";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import Link from "@/components/Link";

interface TaskProps {
  title: string;
  idd: string;
  description: string;
  priority: string;
  date: string;
  expandedFirst?: boolean;
}

export default function Task({
  title,
  idd,
  description,
  priority,
  date,
  expandedFirst = false,
}: TaskProps) {
  const [expanded, setExpanded] = useState(expandedFirst);

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
              <span>{idd}</span>
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
          <Link href="/TaskDetails">
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
              <div
                className={styles.taskPriority}
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
              <div className={styles.taskDate}>
                <p>{date}</p>
              </div>
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
