import styles from "@/styles/projects.module.scss";
import { MdExpandMore } from "react-icons/md";

interface ProjectsTaskProps {
  task: {
    id: string;
    title: string;
    description: string;
    createdAt: {
      seconds: number;
      nanoseconds: number;
    };
    targetDate: string;
    assignee: string;
    status: string;
    priority: string;
    project: string;
  };
}
function ProjectsTask({ task }: ProjectsTaskProps) {
  const { id, title, priority, project } = task;
  console.log(task);
  return (
    <div className={styles.projectDetailsTasksListItem}>
      <div className={styles.projectDetailsTasksListItemLeft}>
        <p>{"ID LG-12"}</p>
        <p>{title}</p>
      </div>
      <div className={styles.projectDetailsTasksListItemRight}>
        <p
          style={
            priority === "high"
              ? { backgroundColor: "#FF8080" }
              : priority === "medium"
              ? { backgroundColor: "#FFE0B2" }
              : priority === "low"
              ? { backgroundColor: "#DFFFDE" }
              : { backgroundColor: "black" }
          }
        >
          {priority}
        </p>
        <MdExpandMore />
      </div>
    </div>
  );
}
export default ProjectsTask;
