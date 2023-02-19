import styles from "@/styles/projectTasks.module.scss";
import { MdExpandMore } from "react-icons/md";

interface ProjectTasksTasksProps {
  id: string;
  title: string;
  priority: string;
  date: string;
}

function ProjectTasksTasks({
  id,
  title,
  priority,
  date,
}: ProjectTasksTasksProps) {
  return (
    <div className={styles.taskItem}>
      <div className={styles.taskLeftSide}>
        <p>ID {id}</p>
        <p>{title}</p>
      </div>
      <div className={styles.taskRightSide}>
        <p>Design</p>
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
        <p>{date}</p>
        <MdExpandMore />
      </div>
    </div>
  );
}
export default ProjectTasksTasks;
