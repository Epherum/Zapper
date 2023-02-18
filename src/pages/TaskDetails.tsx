import styles from "@/styles/taskDetails.module.scss";
import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { CgArrowsExpandRight } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import { VscAccount } from "react-icons/vsc";

function TaskDetails() {
  const [filter, setFilter] = useState("list");
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);
  return (
    <>
      <div className="circleBlue" />
      <div className="circleGreen" />
      <div className={styles.headline}>
        <div className={styles.title}>
          <p>
            home &gt; Projects &gt; <span>ID LG-21</span>
          </p>
          <h1>Laptop screen blinks</h1>
        </div>
        <div className={styles.timeAndButton}>
          <div className={styles.timeAndIcon}>
            <MdOutlineDateRange />
            <p className={styles.time}>
              {dateState.toLocaleDateString("en-GB", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              &nbsp;
              {dateState.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
          <button className={styles.button}>
            <AiOutlinePlus />
            <p>New Task</p>
          </button>
        </div>
      </div>
      <div className={styles.filters}>
        <div className={styles.status}>
          <p>Status:</p>
          <button
            className={filter === "all" ? styles.active : ""}
            onClick={() => {
              setFilter("all");
            }}
          >
            in progress
          </button>
        </div>
        <div className={styles.priority}>
          <p>Priority:</p>
          <button
            className={filter === "board" ? styles.active : ""}
            onClick={() => {
              setFilter("board");
            }}
          >
            high
          </button>
          <button
            className={filter === "list" ? styles.active : ""}
            onClick={() => {
              setFilter("list");
            }}
          >
            medium
          </button>
          <button
            className={filter === "low" ? styles.active : ""}
            onClick={() => {
              setFilter("list");
            }}
          >
            low
          </button>
        </div>
      </div>
      <div className={styles.lineDivider} />
      <div className={styles.grid}>
        <div className={styles.taskInfo}>
          <h2 className={styles.taskHeadline}>Task information</h2>
          <div className={styles.taskDescription}>
            what the fuck did you just fucking say about me, you little bitch?
            I&apos;ll have you know I graduated top of my class in the Navy
            Seals, and I&apos;ve been involved in numerous secret raids on
            Al-Quaeda, and I have over 300 confirmed kills. I am trained in
            gorilla warfare and
          </div>
          <div className={styles.subtasks}>
            <h2 className={styles.subtasksHeadline}>Subtasks</h2>
            <div className={styles.subtasksList}>
              <div className={styles.subtasksListItem}>
                <div className={styles.subtaskLeftSide}>
                  <p>ID LG-12</p>
                  <p>I have access to the enitre arsenal of the...</p>
                </div>
                <p className={styles.subtaskRightSide}>yesterday</p>
              </div>
              <div className={styles.subtasksListItem}>
                <div className={styles.subtaskLeftSide}>
                  <p>ID LG-12</p>
                  <p>I have access to the enitre arsenal of the...</p>
                </div>
                <p className={styles.subtaskRightSide}>yesterday</p>
              </div>
              <div className={styles.addSubtask}>
                <p>Add new task</p>
                <AiOutlinePlus />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.activity}>
          <h2 className={styles.activityHeadline}>Activity</h2>
          <div className={styles.activityList}>
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
                  bitch? I'll have you know I graduated top of my class in the
                  Navy Seals, and I've been
                </p>
              </div>
            </div>
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
                  bitch? I'll have you know I graduated top of my class in the
                  Navy Seals, and I've been
                </p>
              </div>
            </div>
          </div>
          <div className={styles.activityComment}>
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
          </div>
        </div>

        <div className={styles.gridLineDivider} />

        <div className={styles.taskDetails}>
          <div className={styles.taskDetailsHeadline}>
            <div>
              <h2>Task details</h2>
              <p>ID LG-2</p>
            </div>
            <CgArrowsExpandRight />
          </div>

          <div className={styles.taskDetailsInfo}>
            <div className={styles.taskDetailsInfoItem}>
              <p>name</p>
              <p>Landing Page</p>
            </div>
            <div className={styles.taskDetailsInfoItem}>
              <p>Status</p>
              <p>In progress</p>
            </div>
            <div className={styles.taskDetailsInfoItem}>
              <p>Priority</p>
              <p className={styles.priority}>medium</p>
            </div>
            <div className={styles.taskDetailsInfoItem}>
              <p>Assignee</p>
              <p>Yulia B</p>
            </div>
            <div className={styles.taskDetailsInfoItem}>
              <p>Start date</p>
              <p>Jul 13, 2023</p>
            </div>
            <div className={styles.taskDetailsInfoItem}>
              <p>Tagret date</p>
              <p>Oct 20, 2023</p>
            </div>
            <div className={styles.taskDetailsInfoItem}>
              <p>Project</p>
              <p>Luminous Group</p>
            </div>
          </div>
        </div>
        <div className={styles.createdAt}>
          <p>Created July 22, 2023 4:43 PM by Julia B</p>
          <p>Last updated Oct 12, 2023 2:00 AM by Julia B</p>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;
