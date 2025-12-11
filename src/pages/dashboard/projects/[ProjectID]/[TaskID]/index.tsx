import styles from "@/styles/taskDetails.module.scss";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import Headline from "@/components/Headline";
import { VscAccount } from "react-icons/vsc";
import { MdExpandLess } from "react-icons/md";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import moment from "moment";
import axios from "axios";
import {
  filters,
  filterItem,
  taskInfoHeadline,
  description,
  substasksHeadline,
  subtasks,
  subtasksItem,
  activityHeadline,
  activity,
  activityItem,
  commentAni,
  taskDetailsHeadline,
  taskDetails,
  taskDetailsItem,
  divider,
  editButton,
  deleteButton,
} from "@/animations/taskDetails";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTaskDataContext } from "@/contexts/TaskDataContext";

import Link from "@/components/Link";

export default function TaskDetails() {
  const { data: session } = useSession({
    required: true,
  });
  const [priority, setPriority] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const queryClient = useQueryClient();

  const {
    setTaskData,
    setisTaskModalVisible,
    isTaskModalVisible,
    setSubtaskProject,
    subtaskProject,
  } = useTaskDataContext();
  const router = useRouter();
  const TaskID = router.query.TaskID as string;
  const ProjectID = router.query.ProjectID as string;
  const [dates, setDates] = useState({
    startDate: "",
    targetDate: "",
    createdAt: "",
    lastUpdated: "",
  });

  function handleSubtask() {
    setSubtaskProject([ProjectID, TaskID]);
    setisTaskModalVisible(!isTaskModalVisible);
  }

  async function getSubtasks() {
    const res = await axios.get(`/api/tasks/project/${ProjectID}`);
    const tasks = res.data || [];
    return tasks.filter(
      (task: any) => task.parentTaskId === TaskID || task.subtaskOf === TaskID
    );
  }

  async function getTasks() {
    const res = await axios.get(`/api/tasks/${TaskID}`);
    const task = res.data;

    setPriority(task?.priority);
    setStatus(task?.status);
    setDates({
      startDate: moment.unix(task?.createdAt.seconds).format("MMMM DD, YYYY"),
      targetDate: moment(task?.targetDate).format("MMMM DD, YYYY"),
      createdAt: moment
        .unix(task?.createdAt.seconds)
        .format("MMM D, YYYY h:mm A"),
      lastUpdated: "",
    });
    if (task?.lastUpdated) {
      setDates((prev) => ({
        ...prev,
        lastUpdated: moment
          .unix(task?.lastUpdated.seconds)
          .format("MMM D, YYYY h:mm A"),
      }));
    }

    return task;
  }
  function deleteTask() {
    if (taskData) {
      axios.delete(`/api/tasks/${taskData.id}`);

      subtaskData?.forEach((subtask: any) => {
        axios.delete(`/api/tasks/${subtask.id}`);
      });

      router.push(`/dashboard/projects/${taskData.project}`);
    }
  }

  async function handleCommentSubmit(e: any) {
    e.preventDefault();
    if (!comment) return;
    const payload = {
      comment,
      userEmail: session?.user?.email,
    };
    const res = await axios.post(
      `/api/tasks/comments/${TaskID}`,
      payload
    );
    queryClient.setQueryData(["comments", TaskID], (prev: any = []) => [
      res.data,
      ...prev,
    ]);
    setComment("");
  }

  async function deleteComment(commentID: string) {
    await axios.delete(`/api/tasks/comments/${TaskID}`, {
      data: { id: commentID },
    });
    queryClient.invalidateQueries(["comments", TaskID]);
  }

  function editTask() {
    setTaskData(taskData);
    setisTaskModalVisible(!isTaskModalVisible);
  }

  const { data: taskData } = useQuery(["task", TaskID], getTasks, {
    enabled: !!TaskID && !!ProjectID,
  });

  const { data: commentsData } = useQuery(
    ["comments", TaskID],
    async () => {
      const res = await axios.get(`/api/tasks/comments/${TaskID}`);
      return res.data;
    },
    {
      enabled: !!TaskID,
    }
  );

  const { data: subtaskData } = useQuery(["subtasks", TaskID], getSubtasks, {
    enabled: !!TaskID && !!ProjectID,
  });

  return (
    <section>
      {taskData && TaskID && ProjectID && (
        <>
          <Headline
            title={taskData.title}
            location={["home", "projects", ProjectID, TaskID]}
          />
          <motion.div
            variants={filters}
            initial="hidden"
            animate="visible"
            className={styles.filters}
          >
            <motion.div variants={filterItem} className={styles.status}>
              <p>Status:</p>
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              >
                <option value="To do">To do </option>
                <option value="In progress">In progress</option>
                <option value="Done">Done</option>
                <option value="Backlog">Backlog</option>
              </select>
            </motion.div>
            <motion.div variants={filterItem} className={styles.priority}>
              <p>Priority:</p>
              {["low", "medium", "high"].map((item, index) => (
                <button
                  key={index}
                  className={priority === item ? styles.active : ""}
                  onClick={() => {
                    setPriority(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            variants={divider}
            initial="hidden"
            animate="visible"
            className={styles.lineDivider}
          />

          <div className={styles.grid}>
            <div className={styles.taskInfo}>
              <motion.h2
                variants={taskInfoHeadline}
                initial="hidden"
                animate="visible"
                className={styles.taskHeadline}
              >
                Task information
              </motion.h2>
              <motion.p
                variants={description}
                initial="hidden"
                animate="visible"
                className={styles.taskDescription}
              >
                {taskData.description}
              </motion.p>
              {taskData?.subtaskOf ? (
                <></>
              ) : (
                <div className={styles.subtasks}>
                  <motion.h2
                    variants={substasksHeadline}
                    initial="hidden"
                    animate="visible"
                    className={styles.subtasksHeadline}
                  >
                    Subtasks
                  </motion.h2>
                  <motion.div
                    variants={subtasks}
                    initial="hidden"
                    animate="visible"
                    className={styles.subtasksList}
                  >
                    {subtaskData?.map((subtask: any, index: number) => (
                      <Link
                        href={`/dashboard/projects/${taskData.project}/${subtask.id}`}
                        key={index}
                      >
                        <motion.div
                          variants={subtasksItem}
                          className={styles.subtasksListItem}
                        >
                          <div className={styles.subtaskLeftSide}>
                            <p>ID {subtask.id}</p>
                            <p>
                              {subtask.title.substring(0, 20)}
                              {subtask.title.length > 20 ? "..." : ""}
                            </p>
                          </div>
                          <p className={styles.subtaskRightSide}>
                            {subtask.status}
                          </p>
                        </motion.div>
                      </Link>
                    ))}

                    <motion.button
                      variants={subtasksItem}
                      className={styles.addSubtask}
                      onClick={() => handleSubtask()}
                    >
                      Add new subtask
                      <AiOutlinePlus />
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </div>

            <div className={styles.activity}>
              <motion.h2
                variants={activityHeadline}
                initial="hidden"
                animate="visible"
                className={styles.activityHeadline}
              >
                Activity
              </motion.h2>
              <motion.div
                variants={activity}
                initial="hidden"
                animate="visible"
                className={styles.activityList}
              >
                {commentsData?.map((comment: any) => (
                  <motion.div
                    key={comment.id}
                    variants={activityItem}
                    className={styles.activityItem}
                  >
                    <div className={styles.activityItemHeadline}>
                      <div className={styles.activityItemHeadlineLeftSide}>
                        <Image
                          src={"/profile2.png"}
                          width={35}
                          height={35}
                          alt="Picture of the author"
                          className={styles.member}
                        />
                        {session?.user?.email === comment.user ? (
                          <p className={styles.commenter}>You</p>
                        ) : (
                          <p className={styles.commenter}> {comment.user}</p>
                        )}
                        <p className={styles.addedComment}>added comment</p>
                        {session?.user?.email === comment.user && (
                          <button
                            className={styles.deleteComment}
                            onClick={() => {
                              deleteComment(comment.id);
                            }}
                          >
                            delete
                          </button>
                        )}
                      </div>
                      <p className={styles.commentDate}>
                        {moment
                          .unix(comment.createdAt.seconds)
                          .format("MMM DD hh:mm a")}
                      </p>
                    </div>
                    <div className={styles.activityItemDescription}>
                      <p>{(comment.comment || comment.body || "").substring(0, 100)}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={commentAni}
                initial="hidden"
                animate="visible"
                className={styles.activityComment}
              >
                <p className={styles.commentProfile}>
                  <VscAccount />
                </p>
                <form
                  className={styles.commentBox}
                  onSubmit={(e) => handleCommentSubmit(e)}
                >
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className={styles.commentIcons}>
                    <button type="submit">
                      <FiSend />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            <motion.div
              variants={divider}
              initial="hidden"
              animate="visible"
              className={styles.gridLineDivider}
            />

            <div className={styles.taskDetails}>
              <motion.div
                variants={taskDetailsHeadline}
                initial="hidden"
                animate="visible"
                className={styles.taskDetailsHeadline}
              >
                <div>
                  <h2>Task details</h2>
                  <p>ID {taskData.id}</p>
                </div>
              </motion.div>

              <motion.div
                variants={taskDetails}
                initial="hidden"
                animate="visible"
                className={styles.taskDetailsInfo}
              >
                {taskData?.subtaskOf ? (
                  <motion.div
                    variants={taskDetailsItem}
                    className={styles.taskDetailsInfoItem}
                  >
                    <p>Subtask of</p>
                    <Link
                      className={styles.subtaskOf}
                      href={`/dashboard/projects/${taskData.project}/${taskData.subtaskOf}`}
                    >
                      {taskData.subtaskOf}
                    </Link>
                  </motion.div>
                ) : (
                  <></>
                )}
                <motion.div
                  variants={taskDetailsItem}
                  className={styles.taskDetailsInfoItem}
                >
                  <p>Status</p>
                  <p>{taskData.status}</p>
                </motion.div>
                <motion.div
                  variants={taskDetailsItem}
                  className={styles.taskDetailsInfoItem}
                >
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
                    {taskData.priority}
                  </p>
                </motion.div>
                <motion.div
                  variants={taskDetailsItem}
                  className={styles.taskDetailsInfoItem}
                >
                  <p>Assignee</p>
                  <div className={styles.assignee}>
                    <Image
                      src={"/profile1.png"}
                      width={35}
                      height={35}
                      alt="Picture of the author"
                      className={styles.member}
                    />
                    <p>{taskData.assignee}</p>
                  </div>
                </motion.div>
                <motion.div
                  variants={taskDetailsItem}
                  className={styles.taskDetailsInfoItem}
                >
                  <p>Start date</p>
                  <p>{dates.startDate}</p>
                </motion.div>
                <motion.div
                  variants={taskDetailsItem}
                  className={styles.taskDetailsInfoItem}
                >
                  <p>Tagret date</p>
                  <p>{dates.targetDate}</p>
                </motion.div>
                <motion.div
                  variants={taskDetailsItem}
                  className={styles.taskDetailsInfoItem}
                >
                  <p>Project</p>
                  <p>{taskData.project}</p>
                </motion.div>
              </motion.div>
              <motion.button
                variants={editButton}
                initial="hidden"
                animate="visible"
                className={styles.edit}
                onClick={editTask}
              >
                Edit Task
              </motion.button>
              <motion.button
                variants={deleteButton}
                initial="hidden"
                animate="visible"
                className={styles.delete}
                onClick={deleteTask}
              >
                Delete Task
              </motion.button>
            </div>
            <div className={styles.createdAt}>
              <p>
                Created {dates.createdAt} by {taskData.assignee}
              </p>
              {dates.lastUpdated && (
                <p>
                  Last updated {dates.lastUpdated} by {taskData.assignee}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
