import styles from "@/styles/projectTasks.module.scss";
import Tasks from "@/components/ProjectTasksTasks";
import { useState, useEffect } from "react";
import TaskDetails from "@/components/TaskDetails";
import { AnimatePresence, motion } from "framer-motion";
import { tasksHeadline, tasks, taskItem } from "@/animations/projectTasks";

export default function ProjectTasksList({ tasksData, removeFromData }: any) {
  const [selectedTask, setselectedTask] = useState("");
  const [switchP, setSwitchP] = useState(false);

  function removeSelectedTask() {
    setselectedTask("");
  }

  return (
    <div className={styles.grid}>
      {["To do", "In progress", "Backlog", "Done"].map((title, index) => (
        <>
          {tasksData?.filter((task: any) => task.status === title).length !==
            0 && (
            <div className={styles.tasks} key={tasksData.id}>
              <motion.h2
                variants={tasksHeadline}
                initial="hidden"
                animate="visible"
                className={`${styles.tasksHeadline} ${
                  index === 0 && styles.first
                }`}
              >
                {title}
              </motion.h2>
              <motion.div
                variants={tasks}
                initial="hidden"
                animate="visible"
                className={styles.tasksList}
              >
                {tasksData
                  ?.filter((task: any) => task.status === title)
                  .map((task: any, index: number) => (
                    <motion.div
                      variants={taskItem}
                      key={task.id}
                      className={selectedTask === task ? styles.active : ""}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2, ease: "easeOut" },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setselectedTask(task);
                        setSwitchP((prev) => !prev);
                      }}
                    >
                      <Tasks task={task} />
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          )}
        </>
      ))}

      <div className={styles.gridLineDivider} />

      <AnimatePresence mode="wait">
        {selectedTask && switchP && (
          <motion.div
            key="1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            exit={{ opacity: 0, y: 20 }}
            className={styles.taskDetails}
          >
            <TaskDetails
              taskData={selectedTask}
              removeFromData={removeFromData}
              removeSelectedTask={removeSelectedTask}
            />
          </motion.div>
        )}
        {selectedTask && !switchP && (
          <motion.div
            key="2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            exit={{ opacity: 0, y: 20 }}
            className={styles.taskDetails}
          >
            <TaskDetails
              taskData={selectedTask}
              removeFromData={removeFromData}
              removeSelectedTask={removeSelectedTask}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
