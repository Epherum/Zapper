import styles from "@/styles/projectTasks.module.scss";
import { CgArrowsExpandRight } from "react-icons/cg";
import Tasks from "@/components/ProjectTasksTasks";
import Link from "next/link";
import { tasksData } from "@/data/mockData";

function ProjectTasksList() {
  return (
    <div className={styles.grid}>
      <div className={styles.tasks}>
        <h2 className={`${styles.tasksHeadline} ${styles.first}`}>To do</h2>
        <div className={styles.tasksList}>
          {tasksData.slice(0, 3).map((task) => (
            <Tasks
              key={task.id}
              id={task.id}
              title={task.title}
              priority={task.priority}
              date={task.date}
            />
          ))}
        </div>
        <h2 className={styles.tasksHeadline}>In progress</h2>
        <div className={styles.tasksList}>
          {tasksData.map((task) => (
            <Tasks
              key={task.id}
              id={task.id}
              title={task.title}
              priority={task.priority}
              date={task.date}
            />
          ))}
        </div>
        <h2 className={styles.tasksHeadline}>Backlog</h2>
        <div className={styles.tasksList}>
          {tasksData.map((task) => (
            <Tasks
              key={task.id}
              id={task.id}
              title={task.title}
              priority={task.priority}
              date={task.date}
            />
          ))}
        </div>
      </div>

      <div className={styles.gridLineDivider} />

      <div className={styles.taskDetails}>
        <Link href="/TaskDetails">
          <div className={styles.taskDetailsHeadline}>
            <div>
              <h2>Task details</h2>
              <p>ID LG-2</p>
            </div>
            <CgArrowsExpandRight />
          </div>
        </Link>

        <div className={styles.taskDetailsInfo}>
          <div className={styles.taskDetailsInfoItem}>
            <p>name</p>
            <p>Landing Page</p>
          </div>
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
    </div>
  );
}
export default ProjectTasksList;
