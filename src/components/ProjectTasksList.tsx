import styles from "@/styles/projectTasks.module.scss";
import { CgArrowsExpandRight } from "react-icons/cg";
import Tasks from "@/components/ProjectTasksTasks";
import { tasksData } from "@/data/mockData";
import { useState, useEffect } from "react";
import Link from "@/components/Link";
import TaskDetails from "@/components/TaskDetails";
import { AnimatePresence, motion } from "framer-motion";
import {
  filters,
  filterItem,
  tasksHeadline,
  tasks,
  taskItem,
  divider,
} from "@/animations/projectTasks";
function ProjectTasksList() {
  const [selectedTask, setselectedTask] = useState("");
  const [switchP, setSwitchP] = useState(false);

  return (
    <div className={styles.grid}>
      {["To do", "In progress", "Backlog", "Done"].map((title, index) => (
        <div className={styles.tasks} key={index}>
          <motion.h2
            variants={tasksHeadline}
            initial="hidden"
            animate="visible"
            className={`${styles.tasksHeadline} ${index === 0 && styles.first}`}
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
              .filter((task) => task.status === title)
              .map((task, index) => (
                <motion.div
                  variants={taskItem}
                  key={task.id}
                  className={selectedTask === task.title ? styles.active : ""}
                  onClick={() => {
                    //TODO fix the bug where if you click on
                    //TODO the same project twice, it animates for no reason
                    setselectedTask(task.title);
                    setSwitchP((prev) => !prev);
                  }}
                >
                  <Tasks
                    key={index}
                    id={task.id}
                    title={task.title}
                    priority={task.priority}
                    date={task.date}
                  />
                </motion.div>
              ))}
          </motion.div>
        </div>
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
            <TaskDetails selectedTask={selectedTask} />
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
            <TaskDetails selectedTask={selectedTask} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ProjectTasksList;
