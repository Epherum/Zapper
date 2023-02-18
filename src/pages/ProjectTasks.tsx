import styles from "@/styles/projectTasks.module.scss";
import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { CgArrowsExpandRight } from "react-icons/cg";
import Tasks from "@/components/ProjectTasksTasks";
import Link from "next/link";
import { tasksData } from "@/data/mockData";

function ProjectTasks() {
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
            home &gt; <span>Missguided tasks</span>
          </p>
          <h1>Missguided tasks</h1>
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
        <button
          className={filter === "board" ? styles.active : ""}
          onClick={() => {
            setFilter("board");
          }}
        >
          board
        </button>
        <button
          className={filter === "list" ? styles.active : ""}
          onClick={() => {
            setFilter("list");
          }}
        >
          list
        </button>
      </div>
      <div className={styles.lineDivider} />
      <div className={styles.grid}>
        <div className={styles.tasks}>
          <h2 className={`${styles.tasksHeadline} ${styles.first}`}>To do</h2>
          <div className={styles.tasksList}>
            {tasksData.slice(0, 3).map((task) => (
              <Tasks
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                date={task.date}
              />
            ))}
          </div>
          <h2 className={styles.tasksHeadline}>In progress</h2>
          <div className={styles.tasksList}>
            {tasksData.map((task) => (
              <Tasks
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                date={task.date}
              />
            ))}
          </div>
          <h2 className={styles.tasksHeadline}>Backlog</h2>
          <div className={styles.tasksList}>
            {tasksData.map((task) => (
              <Tasks
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                date={task.date}
              />
            ))}
          </div>
        </div>

        <div className={styles.gridLineDivider} />

        <div className={styles.taskDetails}>
          <Link href="/TaskDetails">
            <div className={styles.taskDetailsHeadline}>
              <div>
                <h2>Task details</h2>
                <p>ID LG-2</p>
              </div>
              <CgArrowsExpandRight />
            </div>
          </Link>

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
      </div>
    </>
  );
}

export default ProjectTasks;
