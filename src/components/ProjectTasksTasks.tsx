import styles from "@/styles/projectTasks.module.scss";
import { MdExpandMore } from "react-icons/md";
import Image from "next/image";

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
        <p>{id}</p>
        <p>{title}</p>
      </div>
      <div className={styles.taskRightSide}>
        <div className={styles.members}>
          {[
            "/profile1.png",
            "/profile2.png",
            "/profile.png",
            "/profile.png",
          ].map((item, index) => (
            <Image
              key={index}
              src={item}
              width={35}
              height={35}
              alt="Picture of the author"
              className={styles.member}
            />
          ))}
        </div>
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
