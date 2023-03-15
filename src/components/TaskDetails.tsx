import styles from "@/styles/projectTasks.module.scss";
import { CgArrowsExpandRight } from "react-icons/cg";
import Link from "@/components/Link";
import Image from "next/image";

function TaskDetails(taskData: any) {
  const { title, status, priority, assignee, project, id } = taskData.taskData; //bruh
  return (
    <div className={styles.taskDetails}>
      <Link href={`/dashboard/projects/${project}/${id}`}>
        <div className={styles.taskDetailsHeadline}>
          <div>
            <h2>{title}</h2>
            <p>ID LG-2</p>
          </div>
          <CgArrowsExpandRight />
        </div>
      </Link>

      <div className={styles.taskDetailsInfo}>
        <div className={styles.taskDetailsInfoItem}>
          <p>Status</p>
          <p>{status}</p>
        </div>
        <div className={styles.taskDetailsInfoItem}>
          <p>Priority</p>
          <p className={styles.priority}>{priority}</p>
        </div>
        <div className={styles.taskDetailsInfoItem}>
          <p>Assignee</p>
          <div className={styles.assignee}>
            <Image
              src={"/profile1.png"}
              width={35}
              height={35}
              alt="Picture of the author"
              className={styles.member}
            />
            <p>{assignee}</p>
          </div>
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
          <p>{project}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
