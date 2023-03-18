import styles from "@/styles/dashboard.module.scss";
import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineFilterList } from "react-icons/md";
import { CgArrowsExpandRight } from "react-icons/cg";
import Task from "@/components/DashboardTask";
import Project from "@/components/DashboardProject";
import LineChart from "@/components/LineChart";
import { db } from "@/firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import {
  overviewData,
  tasksData,
  projectsData,
  chartData,
} from "@/data/mockData";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import {
  title,
  subtitle,
  buttons,
  overview,
  overviewItem,
  tasks,
  taskItem,
  projects,
  projectItem,
  chart,
  chartHeadline,
  progress,
  tasksHeadline,
  projectsHeadline,
} from "@/animations/index";
import { useModalDimContext } from "@/contexts/ModalDimContext";

export default function Dashboard() {
  const { isModalDimmed, setIsModalDimmed } = useModalDimContext();
  const [formattedDate, setFormattedDate] = useState("");
  const { data: session } = useSession({
    required: true,
  });
  function handleToggle() {
    setIsModalDimmed(!isModalDimmed);
  }
  const formatDate = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const newFormattedDate = `${month} ${day} ${year} ${formattedHours}:${formattedMinutes} ${ampm}`;

    setFormattedDate(newFormattedDate);
  };

  async function getUserData() {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(session?.user?.email),
    });

    const user = await res.json();

    //  return user;
    console.log(user);
  }

  useEffect(() => {
    console.log("session", session);
    getUserData();

    formatDate();

    const intervalId = setInterval(() => {
      formatDate();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  if (!session) return <></>;

  return (
    <section>
      <div className={styles.headline}>
        <div className={styles.title}>
          <motion.h1 variants={title} initial="hidden" animate="visible">
            Welcome back, <span>Royal</span>
          </motion.h1>
          <motion.p variants={subtitle} initial="hidden" animate="visible">
            Track, manage and forecast projects and timeline
          </motion.p>
        </div>
        <motion.div
          variants={buttons}
          initial="hidden"
          animate="visible"
          className={styles.timeAndButton}
        >
          <div className={styles.timeAndIcon}>
            <MdOutlineDateRange />
            <p className={styles.time}>{formattedDate}</p>
          </div>
          <button className={styles.button} onClick={handleToggle}>
            <AiOutlinePlus />
            <p>New Task</p>
          </button>
        </motion.div>
      </div>
      <motion.div
        variants={overview}
        initial="hidden"
        animate="visible"
        className={styles.overview}
      >
        {overviewData.map((item, index) => (
          <motion.div
            variants={overviewItem}
            key={index}
            className={styles.overviewItem}
          >
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
          </motion.div>
        ))}
      </motion.div>
      <div className={styles.grid}>
        <div className={styles.mytasks}>
          <motion.div
            variants={tasksHeadline}
            initial="hidden"
            animate="visible"
            className={styles.tasksHeadline}
          >
            <p>My tasks</p>
            <CgArrowsExpandRight />
          </motion.div>
          <motion.div
            variants={tasks}
            initial="hidden"
            animate="visible"
            className={styles.tasks}
          >
            {tasksData.map((task, index) => (
              <motion.div variants={taskItem} key={index}>
                <Task
                  title={task.title}
                  date={task.date}
                  description={task.description}
                  idd={task.idd}
                  priority={task.priority}
                  expandedFirst={index === 0 ? true : false}
                />
              </motion.div>
            ))}
            <div className={`${styles.task} ${styles.addTask}`}>
              <p>Add new task</p>
              <AiOutlinePlus />
            </div>
          </motion.div>
        </div>
        <div className={styles.statistics}>
          <motion.div
            variants={chartHeadline}
            initial="hidden"
            animate="visible"
            className={styles.statisticsHeadline}
          >
            <p>Statistics</p>
            <p>tasks created vs tasks completed vs tasks overdue</p>
          </motion.div>

          <motion.div
            variants={chart}
            initial="hidden"
            animate="visible"
            className={styles.statisticsChart}
          >
            <LineChart chartData={chartData()} />
          </motion.div>
        </div>
        <motion.div
          variants={progress}
          initial="hidden"
          animate="visible"
          className={styles.progress}
        >
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
        </motion.div>
        <div className={styles.projects}>
          <motion.div
            variants={projectsHeadline}
            initial="hidden"
            animate="visible"
            className={styles.projectsHeadline}
          >
            <p>My projects</p>
            <CgArrowsExpandRight />
          </motion.div>
          <motion.div
            variants={projects}
            initial="hidden"
            animate="visible"
            className={styles.projectsList}
          >
            {projectsData.map((item, index) => (
              <motion.div variants={projectItem} key={index}>
                <Project
                  title={item.title}
                  tasks={item.tasks}
                  overdue={item.overdue}
                  date={item.date}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
