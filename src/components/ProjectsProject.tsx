import styles from "@/styles/projects.module.scss";

interface ProjectsProjectProps {
  title: string;
  tasks: number;
  overdue: number;
  dateRange: string;
}

function ProjectsProject({
  title,
  tasks,
  overdue,
  dateRange,
}: ProjectsProjectProps) {
  return (
    <div className={styles.project}>
      <div className={styles.projectLeftSide}>
        <div className={styles.projectInfo}>
          <p>{title}</p>
          <p>
            {tasks} tasks <span>•</span> {overdue} overdue
          </p>
        </div>
      </div>
      <div className={styles.projectRightSide}>
        <p>3 days left</p>
        <p>{dateRange}</p>
      </div>
    </div>
  );
}
export default ProjectsProject;
