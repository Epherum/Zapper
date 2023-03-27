import styles from "@/styles/dashboard.module.scss";
import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineFilterList } from "react-icons/md";
import { CgArrowsExpandRight } from "react-icons/cg";
import Task from "@/components/DashboardTask";
import Project from "@/components/DashboardProject";
import LineChart from "@/components/LineChart";
import { chartData } from "@/data/mockData";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
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

import { useQuery, useQueries } from "@tanstack/react-query";
import Link from "@/components/Link";
import {
  getUserCompanyData,
  getTasksAssignedToUser,
  getProjectsAssignedToUser,
} from "@/lib/api";
import { useProjectDataContext } from "@/contexts/ProjectDataContext";
import { useTaskDataContext } from "@/contexts/TaskDataContext";

export default function Dashboard() {
  const { isTaskModalVisible, setisTaskModalVisible } = useTaskDataContext();
  const [formattedDate, setFormattedDate] = useState("");
  const [overviewData, setOverviewData] = useState([
    {
      title: "Completed Tasks",
      tasks: 0,
      color: "#28BFFF",
      backgroundColor: "#E5F7FF",
      display: "flex",
    },
    {
      title: "Incompleted Tasks",
      tasks: 0,
      color: "#7164C6",
      backgroundColor: "#EFEDF9",
      display: "flex",
    },
    {
      title: "Overdue Tasks",
      tasks: 0,
      color: "#2DA757",
      backgroundColor: "#E7F5EC",
      display: "flex",
    },
    {
      title: "Total Tasks",
      tasks: 0,
      color: "#28BFFF",
      backgroundColor: "#E5F7FF",
      display: "none",
    },
  ]);
  const [completedPercentage, setCompletedPercentage] = useState(0);

  const { data: session } = useSession({
    required: true,
  });
  function showTaskModal() {
    setisTaskModalVisible(!isTaskModalVisible);
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
  const results = useQueries({
    queries: [
      {
        queryKey: ["user"],
        queryFn: () => getUserCompanyData(session?.user?.email as string),
        enabled: !!session,
        onSuccess(data: any) {
          session && (session.user = data);
          console.log(session);
        },
      },
      {
        queryKey: ["currentUserProjects"],
        queryFn: () =>
          getProjectsAssignedToUser(session?.user?.email as string),
        enabled: !!session,
      },
      {
        queryKey: ["currentUserTasks"],
        queryFn: () => getTasksAssignedToUser(session?.user?.email as string),
        enabled: !!session,
      },
    ],
  });

  const [currentUser, userProjects, userTasks] = results.map((result) => {
    return result.data;
  });

  useEffect(() => {
    formatDate();
    console.log(session);

    const intervalId = setInterval(() => {
      formatDate();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [session]);

  useEffect(() => {
    if (userTasks) {
      setOverviewData((prev) => {
        return [
          {
            ...prev[0],
            tasks: userTasks.filter((task: any) => task.status === "Done")
              .length,
          },
          {
            ...prev[1],
            tasks: userTasks.filter((task: any) => task.status !== "Done")
              .length,
          },
          {
            ...prev[2],
            tasks: userTasks.filter((task: any) => task.status === "Backlog")
              .length,
          },
          {
            ...prev[3],
            tasks: userTasks.length,
          },
        ];
      });
      setCompletedPercentage(
        Math.round(
          (userTasks.filter((task: any) => task.status === "Done").length /
            userTasks.length) *
            100
        )
      );
    }
  }, [userTasks]);

  if (!currentUser) return <></>;

  return (
    <section>
      {currentUser && userTasks && userProjects && (
        <>
          <div className={styles.headline}>
            <div className={styles.title}>
              <motion.h1 variants={title} initial="hidden" animate="visible">
                Welcome back, <span>{currentUser.name}</span>
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
              <button className={styles.button} onClick={showTaskModal}>
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
                {userTasks?.map((task: any, index: number) => (
                  <motion.div variants={taskItem} key={task.id}>
                    <Task
                      task={task}
                      expandedFirst={index === 0 ? true : false}
                    />
                  </motion.div>
                ))}
                <motion.button
                  variants={taskItem}
                  className={`${styles.task} ${styles.addTask}`}
                  onClick={showTaskModal}
                >
                  Add new task
                  <AiOutlinePlus />
                </motion.button>
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
                <p>view a summary of your work over this month</p>
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
                  {completedPercentage}
                  <span>%</span>
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
                {userProjects?.map((project: any, index: number) => (
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
