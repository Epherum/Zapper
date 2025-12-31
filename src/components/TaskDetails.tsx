import styles from "@/styles/projectTasks.module.scss";
import { CgArrowsExpandRight } from "react-icons/cg";
import Link from "@/components/Link";
import Image from "next/image";
import { useTaskDataContext } from "@/contexts/TaskDataContext";
import moment from "moment";
import { deleteTask } from "@/lib/api";
import { formatShortId } from "@/lib/format";
function TaskDetails(props: any) {
  const {
    title,
    status,
    priority,
    assignee,
    project,
    id,
    createdAt,
    targetDate,
  } = props.taskData;
  const { setTaskData, isTaskModalVisible, setisTaskModalVisible } =
    useTaskDataContext();

  const formattedCreatedAt = moment
    .unix(createdAt.seconds)
    .format("MMMM DD, YYYY");
  const formattedTargetDate = moment(targetDate).format("MMMM DD, YYYY");

  async function deleteTaskItem() {
    await deleteTask(id);
    props.removeFromData(id);
    props.removeSelectedTask();
  }

  function editTask() {
    setTaskData(props.taskData);
    setisTaskModalVisible(true);
  }

  return (
    <div className={styles.taskDetails}>
      <Link href={`/dashboard/projects/${project}/${id}`}>
        <div className={styles.taskDetailsHeadline}>
          <div>
            <h2>{title}</h2>
            <p>ID {formatShortId(id)}</p>
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
          <p
            className={styles.priority}
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
          <p>{formattedCreatedAt}</p>
        </div>
        <div className={styles.taskDetailsInfoItem}>
          <p>Tagret date</p>
          <p>{targetDate ? formattedTargetDate : "Not set"}</p>
        </div>
        <div className={styles.taskDetailsInfoItem}>
          <p>Project</p>
          <p>{project}</p>
        </div>
      </div>
      <button className={styles.edit} onClick={editTask}>
        Edit Task
      </button>
      <button className={styles.delete} onClick={deleteTaskItem}>
        Delete Task
      </button>
    </div>
  );
}

export default TaskDetails;
