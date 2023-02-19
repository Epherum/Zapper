import styles from "@/styles/dashboard.module.scss";
import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineFilterList } from "react-icons/md";
import { CgArrowsExpandRight } from "react-icons/cg";
import Task from "@/components/DashboardTask";
import Project from "@/components/DashboardProject";
import LineChart from "@/components/LineChart";
import {
  overviewData,
  tasksData,
  projectsData,
  chartData,
} from "@/data/mockData";

function HomePage() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <>
      <div className={styles.headline}>
        <div className={styles.title}>
          <h1>
            Welcome back, <span>Royal</span>
          </h1>
          <p>Track, manage and forecast projects and timeline</p>
        </div>
        <div className={styles.timeAndButton}>
          <div className={styles.timeAndIcon}>
            <MdOutlineDateRange />
            {/* <p className={styles.time}>
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
            </p> */}
          </div>
          <button className={styles.button}>
            <AiOutlinePlus />
            <p>New Task</p>
          </button>
        </div>
      </div>
      <div className={styles.overview}>
        {overviewData.map((item, index) => (
          <div key={index} className={styles.overviewItem}>
            <h2 className={styles.overviewItemTitle}>{item.title}</h2>
            <div className={styles.overviewItemContent}>
              <p>
                {item.tasks} <span>tasks</span>
              </p>
              <p
                style={{
                  color: item.color,
                  backgroundColor: item.backgroundColor,
                  display: item.display,
                }}
              >
                <MdOutlineFilterList /> 1 Filter
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        <div className={styles.mytasks}>
          <div className={styles.tasksHeadline}>
            <p>My tasks</p>
            <CgArrowsExpandRight />
          </div>
          <div className={styles.tasks}>
            {tasksData.map((item, index) => (
              <Task
                key={index}
                title={item.title}
                id={item.id}
                description={item.description}
                priority={item.priority}
                date={item.date}
                backgroundColor={item.backgroundColor}
              />
            ))}
            <div className={`${styles.task} ${styles.addTask}`}>
              <p>Add new task</p>
              <AiOutlinePlus />
            </div>
          </div>
        </div>
        <div className={styles.statistics}>
          <div className={styles.statisticsHeadline}>
            <p>Statistics</p>
            <p>tasks created vs tasks completed vs tasks overdue</p>
          </div>
          <div className={styles.statisticsChart}>
            <LineChart chartData={chartData()} />
          </div>
        </div>
        <div className={styles.progress}>
          <div className={styles.progressDate}>
            <p>June 30 - July 30</p>
          </div>
          <div className={styles.progressCircle}>
            <p>
              80<span>%</span>
            </p>
            <p>completed</p>
          </div>
          <div className={styles.progressSummary}>
            <p>You&apos;re doing good!</p>
            <p>You almost reached your goal</p>
          </div>
        </div>
        <div className={styles.projects}>
          <div className={styles.projectsHeadline}>
            <p>My projects</p>
            <CgArrowsExpandRight />
          </div>
          <div className={styles.projectsList}>
            {projectsData.map((item, index) => (
              <Project
                key={index}
                title={item.title}
                tasks={item.tasks}
                overdue={item.overdue}
                date={item.date}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
