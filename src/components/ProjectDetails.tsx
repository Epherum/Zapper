import styles from "@/styles/projects.module.scss";
import { CgArrowsExpandRight } from "react-icons/cg";
import Task from "@/components/ProjectsTask";
import { projectsData, tasksData } from "@/data/mockData";
import Link from "@/components/Link";

function ProjectDetails({ selectedProject }: { selectedProject: string }) {
  return (
    <>
      <Link href="/ProjectTasks" className={styles.projectDetailsHeadline}>
        <h2>{selectedProject}</h2>
        <CgArrowsExpandRight />
      </Link>
      <p className={styles.projectDetailsDescription}>
        {
          projectsData.filter((project) => project.title === selectedProject)[0]
            .description
        }
      </p>
      <div className={styles.projectDetailsInfo}>
        <div className={styles.projectDetailsInfoItem}>
          <p>Status</p>
          <p>Active</p>
        </div>
        <div className={styles.projectDetailsInfoItem}>
          <p>Project manager</p>
          <p>Michael Scott</p>
        </div>
        <div className={styles.projectDetailsInfoItem}>
          <p>Start date</p>
          <p>Jul 13, 2023</p>
        </div>
        <div className={styles.projectDetailsInfoItem}>
          <p>Target date</p>
          <p>Oct 20, 2023</p>
        </div>
        <div className={styles.projectDetailsInfoItem}>
          <p>Members</p>
          <p>John Doe</p>
        </div>
      </div>
      <div className={styles.projectDetailsTasks}>
        <h3>Recent tasks</h3>
        <div className={styles.projectDetailsTasksList}>
          {tasksData.slice(0, 3).map((task: any, index: number) => (
            <Link href="/ProjectTasks" key={index}>
              <Task id={task.idd} title={task.title} priority={task.priority} />
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.projectDetailsProgress}>
        <h2 className={styles.projectDetailsProgressHeadline}>Progress</h2>
        <div className={styles.projectDetailsProgressLine}>
          <div />
          <p>43%</p>
        </div>
      </div>
    </>
  );
}

export default ProjectDetails;
