import styles from "@/styles/taskDetails.module.scss";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CgArrowsExpandRight } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import Headline from "@/components/Headline";
import { VscAccount } from "react-icons/vsc";
import { MdExpandLess } from "react-icons/md";
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
  comment,
  taskDetailsHeadline,
  taskDetails,
  taskDetailsItem,
  divider,
} from "@/animations/taskDetails";
import { motion } from "framer-motion";

function TaskDetails() {
  const [filter, setFilter] = useState("list");

  return (
    <section>
      <Headline
        title="Laptop screen blinks"
        location={["home", "projects", "missguided", "ID LG-23"]}
      />
      <motion.div
        variants={filters}
        initial="hidden"
        animate="visible"
        className={styles.filters}
      >
        <motion.div variants={filterItem} className={styles.status}>
          <p>Status:</p>
          <button
            className={filter === "all" ? styles.active : ""}
            onClick={() => {
              setFilter("all");
            }}
          >
            in progress <MdExpandLess />
          </button>
        </motion.div>
        <motion.div variants={filterItem} className={styles.priority}>
          <p>Priority:</p>
          {["low", "medium", "high"].map((item, index) => (
            <button
              key={index}
              className={filter === item ? styles.active : ""}
              onClick={() => {
                setFilter(item);
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
          <motion.div
            variants={description}
            initial="hidden"
            animate="visible"
            className={styles.taskDescription}
            contentEditable="true"
          >
            what the fuck did you just fucking say about me, you little bitch?
            I&apos;ll have you know I graduated top of my class in the Navy
            Seals, and I&apos;ve been involved in numerous secret raids on
            Al-Quaeda, and I have over 300 confirmed kills. I am trained in
            gorilla warfare and
          </motion.div>
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
              <motion.div
                variants={subtasksItem}
                className={styles.subtasksListItem}
              >
                <div className={styles.subtaskLeftSide}>
                  <p>ID LG-12</p>
                  <p>I have access to the enitre arsenal of the...</p>
                </div>
                <p className={styles.subtaskRightSide}>yesterday</p>
              </motion.div>
              <motion.div
                variants={subtasksItem}
                className={styles.subtasksListItem}
              >
                <div className={styles.subtaskLeftSide}>
                  <p>ID LG-12</p>
                  <p>I have access to the enitre arsenal of the...</p>
                </div>
                <p className={styles.subtaskRightSide}>yesterday</p>
              </motion.div>
              <motion.div variants={subtasksItem} className={styles.addSubtask}>
                <p>Add new task</p>
                <AiOutlinePlus />
              </motion.div>
            </motion.div>
          </div>
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
            <motion.div variants={activityItem} className={styles.activityItem}>
              <div className={styles.activityItemHeadline}>
                <div className={styles.activityItemHeadlineLeftSide}>
                  <p>Yulia B</p>
                  <p>added comment</p>
                </div>
                <p className={styles.activityItemHeadlineRightSide}>
                  1 hour ago
                </p>
              </div>
              <div className={styles.activityItemDescription}>
                <p>
                  what the fuck did you just fucking say about me, you little
                  bitch? Ill have you know I graduated top of my class in the
                  Navy Seals, and Ive been
                </p>
              </div>
            </motion.div>
            <div className={styles.activityItem}>
              <div className={styles.activityItemHeadline}>
                <div className={styles.activityItemHeadlineLeftSide}>
                  <p>Yulia B</p>
                  <p>added comment</p>
                </div>
                <p className={styles.activityItemHeadlineRightSide}>
                  1 hour ago
                </p>
              </div>
              <div className={styles.activityItemDescription}>
                <p>
                  what the fuck did you just fucking say about me, you little
                  bitch? Ill have you know I graduated top of my class in the
                  Navy Seals, and Ive been
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={comment}
            initial="hidden"
            animate="visible"
            className={styles.activityComment}
          >
            <p className={styles.commentProfile}>
              <VscAccount />
            </p>
            <div className={styles.commentRightSide}>
              <input type="text" placeholder="Add a comment" />
              <div className={styles.commentIcons}>
                <button>
                  <FiSend />
                </button>
                <button>
                  <ImAttachment />
                </button>
              </div>
            </div>
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
              <p>ID LG-2</p>
            </div>
            <CgArrowsExpandRight />
          </motion.div>

          <motion.div
            variants={taskDetails}
            initial="hidden"
            animate="visible"
            className={styles.taskDetailsInfo}
          >
            <motion.div
              variants={taskDetailsItem}
              className={styles.taskDetailsInfoItem}
            >
              <p>name</p>
              <p>Landing Page</p>
            </motion.div>
            <motion.div
              variants={taskDetailsItem}
              className={styles.taskDetailsInfoItem}
            >
              <p>Status</p>
              <p>In progress</p>
            </motion.div>
            <motion.div
              variants={taskDetailsItem}
              className={styles.taskDetailsInfoItem}
            >
              <p>Priority</p>
              <p className={styles.priority}>medium</p>
            </motion.div>
            <motion.div
              variants={taskDetailsItem}
              className={styles.taskDetailsInfoItem}
            >
              <p>Assignee</p>
              <p>Yulia B</p>
            </motion.div>
            <motion.div
              variants={taskDetailsItem}
              className={styles.taskDetailsInfoItem}
            >
              <p>Start date</p>
              <p>Jul 13, 2023</p>
            </motion.div>
            <motion.div
              variants={taskDetailsItem}
              className={styles.taskDetailsInfoItem}
            >
              <p>Tagret date</p>
              <p>Oct 20, 2023</p>
            </motion.div>
            <motion.div
              variants={taskDetailsItem}
              className={styles.taskDetailsInfoItem}
            >
              <p>Project</p>
              <p>Luminous Group</p>
            </motion.div>
          </motion.div>
        </div>
        <div className={styles.createdAt}>
          <p>Created July 22, 2023 4:43 PM by Julia B</p>
          <p>Last updated Oct 12, 2023 2:00 AM by Julia B</p>
        </div>
      </div>
    </section>
  );
}

export default TaskDetails;
