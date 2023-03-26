import styles from "@/styles/projectTasks.module.scss";
import { MdExpandMore } from "react-icons/md";
import Image from "next/image";
import moment from "moment";
interface ProjectTasksTasksProps {
  task: {
    id: string;
    title: string;
    priority: string;
    startDate: string;
    targetDate: string;
  };
}

function ProjectTasksTasks({ task }: ProjectTasksTasksProps) {
  const { id, title, priority, startDate, targetDate } = task;
  const date = `${moment(startDate).format("MMM DD")} - ${moment(
    targetDate
  ).format("MMM DD")}`;

  return (
    <div className={styles.taskItem}>
      <div className={styles.taskLeftSide}>
        <p>ID {id}</p>
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
