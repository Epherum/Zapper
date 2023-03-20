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
import {
  getDocs,
  getDoc,
  doc,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";
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
} from "@/animations/dashboard";
import { useModalDimContext } from "@/contexts/ModalDimContext";
import { useQuery } from "@tanstack/react-query";
import Link from "@/components/Link";

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
    const res = await fetch(`/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(session?.user?.email),
    });

    const user = await res.json();

    return user;
  }
  async function getTasksAssignedToUser(userEmail: string) {
    const tasks = [] as any;
    const usertasks = await getDocs(
      query(collectionGroup(db, "tasks"), where("assignee", "==", userEmail))
    );
    usertasks.forEach((issue) => {
      const issueData = issue.data();
      issueData.id = issue.id;
      tasks.push(issueData);
    });
    console.log("tasks", tasks);
    return tasks;
  }
  async function getProjectsAssignedToUser(userEmail: string) {
    const projects = [] as any;
    const userprojects = await getDocs(
      query(
        collectionGroup(db, "projects"),
        where("members", "array-contains", userEmail)
      )
    );
    userprojects.forEach((issue) => {
      const issueData = issue.data();
      issueData.id = issue.id;
      projects.push(issueData);
    });
    console.log("projects", projects);
    return projects;
  }

  const { data: currentUser } = useQuery(["user"], getUserData, {
    enabled: !!session,
  });

  const { data: projects } = useQuery(
    ["currentUserProjects"],
    () => getProjectsAssignedToUser(currentUser.email),

    {
      enabled: !!currentUser,
    }
  );
  const { data: tasks } = useQuery(
    ["currentUserTasks"],
    () => getTasksAssignedToUser(currentUser.email),

    {
      enabled: !!currentUser,
    }
  );

  useEffect(() => {
    console.log(currentUser);
    formatDate();

    const intervalId = setInterval(() => {
      formatDate();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [currentUser]);

  if (!currentUser) return <></>;

  return (
    <section>
      {currentUser && tasks && projects && (
        <>
          <div className={styles.headline}>
            <div className={styles.title}>
              <motion.h1 variants={title} initial="hidden" animate="visible">
                Welcome back, <span>{currentUser.username}</span>
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
                {tasks?.map((task: any, index: number) => (
                  <motion.div variants={taskItem} key={task.id}>
                    <Task
                      task={task}
                      expandedFirst={index === 0 ? true : false}
                    />
                  </motion.div>
                ))}
                <motion.div
                  variants={taskItem}
                  className={`${styles.task} ${styles.addTask}`}
                >
                  <p>Add new task</p>
                  <AiOutlinePlus />
                </motion.div>
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
              <Link href={`/dashboard/projects`}>
                <motion.div
                  variants={projectsHeadline}
                  initial="hidden"
                  animate="visible"
                  className={styles.projectsHeadline}
                >
                  <p>My projects</p>
                  <CgArrowsExpandRight />
                </motion.div>
              </Link>
              <motion.div
                variants={projects}
                initial="hidden"
                animate="visible"
                className={styles.projectsList}
              >
                {projects.map((project: any, index: number) => (
                  <motion.div variants={projectItem} key={index}>
                    <Project project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
