import styles from "@/styles/projects.module.scss";
import { MdExpandMore } from "react-icons/md";

interface ProjectsTaskProps {
  id: string;
  title: string;
  priority: string;
}
function ProjectsTask({ id, title, priority }: ProjectsTaskProps) {
  return (
    <div className={styles.projectDetailsTasksListItem}>
      <div className={styles.projectDetailsTasksListItemLeft}>
        <p>ID {id}</p>
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
