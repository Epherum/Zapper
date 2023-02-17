import styles from "@/styles/dashboard.module.scss";
import { useState } from "react";
import { CgArrowsExpandRight } from "react-icons/cg";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";

interface TaskProps {
  title: string;
  id: string;
  description: string;
  priority: string;
  date: string;
  backgroundColor: string;
}

export default function Task({
  title,
  id,
  description,
  priority,
  date,
  backgroundColor,
}: TaskProps) {
  const [expanded, setExpanded] = useState(false);

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
              ID: <span>{id}</span>
            </p>
          </div>
          <div className={styles.taskName}>
            <p>{title}</p>
          </div>
          <div
            className={`${styles.taskPriority}  ${
              expanded ? styles.expandedtaskPriority : ""
            }`}
            style={{
              backgroundColor: backgroundColor,
            }}
          >
            <p>{priority}</p>
          </div>
        </div>
        {expanded ? (
          <button onClick={handleExpandClick}>
            <CgArrowsExpandRight />
          </button>
        ) : (
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
                style={{
                  backgroundColor: backgroundColor,
                }}
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
