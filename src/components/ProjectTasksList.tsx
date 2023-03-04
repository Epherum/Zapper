import styles from "@/styles/projectTasks.module.scss";
import Tasks from "@/components/ProjectTasksTasks";
// import { tasksData } from "@/data/mockData";
import { useState } from "react";
import TaskDetails from "@/components/TaskDetails";
import { AnimatePresence, motion } from "framer-motion";
import { tasksHeadline, tasks, taskItem } from "@/animations/projectTasks";

export default function ProjectTasksList({ tasksData }: any) {
  const [selectedTask, setselectedTask] = useState("");
  const [switchP, setSwitchP] = useState(false);

  return (
    <div className={styles.grid}>
      {["To do", "In progress", "Backlog", "Done"].map((title, index) => (
        <>
          {tasksData?.filter((task: any) => task.status === title).length !==
            0 && (
            <div className={styles.tasks} key={index}>
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
                      onClick={() => {
                        setselectedTask(task);
                        setSwitchP((prev) => !prev);
                      }}
                    >
                      <Tasks
                        key={task.id}
                        id={"ID LG-21"}
                        title={task.title}
                        priority={task.priority}
                        date={"2021"}
                      />
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
            <TaskDetails taskData={selectedTask} />
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
            <TaskDetails taskData={selectedTask} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
