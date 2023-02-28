import styles from "@/styles/projectTasks.module.scss";
import { CgArrowsExpandRight } from "react-icons/cg";
import Tasks from "@/components/ProjectTasksTasks";
import { tasksData } from "@/data/mockData";
import { useState, useEffect } from "react";
import Link from "@/components/Link";

function TaskDetails({ selectedTask }: { selectedTask: string }) {
  return (
    <div className={styles.taskDetails}>
      <Link href="/TaskDetails/">
        <div className={styles.taskDetailsHeadline}>
          <div>
            <h2>{selectedTask}</h2>
            <p>ID LG-2</p>
          </div>
          <CgArrowsExpandRight />
        </div>
      </Link>

      <div className={styles.taskDetailsInfo}>
        <div className={styles.taskDetailsInfoItem}>
          <p>Status</p>
          <p>In progress</p>
        </div>
        <div className={styles.taskDetailsInfoItem}>
          <p>Priority</p>
          <p className={styles.priority}>medium</p>
        </div>
        <div className={styles.taskDetailsInfoItem}>
          <p>Assignee</p>
          <p>Yulia B</p>
        </div>
        <div className={styles.taskDetailsInfoItem}>
          <p>Start date</p>
          <p>Jul 13, 2023</p>
        </div>
        <div className={styles.taskDetailsInfoItem}>
          <p>Tagret date</p>
          <p>Oct 20, 2023</p>
        </div>
        <div className={styles.taskDetailsInfoItem}>
          <p>Project</p>
          <p>Luminous Group</p>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
