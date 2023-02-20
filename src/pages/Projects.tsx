import styles from "@/styles/projects.module.scss";
import { useState } from "react";
import { CgArrowsExpandRight } from "react-icons/cg";
import Project from "@/components/ProjectsProject";
import Task from "@/components/ProjectsTask";
import { projectsData, tasksData } from "@/data/mockData";
import Headline from "@/components/Headline";
import Link from "@/components/Link";

function Projects() {
  const [filter, setFilter] = useState("active");

  return (
    <section>
      <div className="circleBlue" />
      <div className="circleGreen" />
      <Headline title="Projects" location={["home", "Projects"]} />

      <div className={styles.filters}>
        <button
          className={filter === "all" ? styles.active : ""}
          onClick={() => {
            setFilter("all");
          }}
        >
          all
        </button>
        <button
          className={filter === "active" ? styles.active : ""}
          onClick={() => {
            setFilter("active");
          }}
        >
          active
        </button>
        <button
          className={filter === "archived" ? styles.active : ""}
          onClick={() => {
            setFilter("archived");
          }}
        >
          archived
        </button>
      </div>

      <div className={styles.lineDivider} />

      <div className={styles.grid}>
        <div className={styles.projects}>
          <h2 className={styles.projectsHeadline}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)} projects
          </h2>
          <div className={styles.projectsList}>
            {projectsData.map((project, index) => (
              <Project
                key={index}
                title={project.title}
                tasks={project.tasks}
                overdue={project.overdue}
                dateRange={project.date}
              />
            ))}
          </div>
        </div>
        {/* <div className={styles.addProject}>
          <p>Create new project</p>
          <AiOutlinePlus />
        </div> */}

        <div className={styles.gridLineDivider} />

        <div className={styles.projectDetails}>
          <div className={styles.projectDetailsHeadline}>
            <h2>Missguided</h2>
            <CgArrowsExpandRight />
          </div>
          <p className={styles.projectDetailsDescription}>
            tasks created vs tasks completed vs tasks overdue tasks created vs
            tasks completed vs tasks overduetasks created vs tasks completed vs
            tasks overduetasks created vs tasks completed vs tasks overdue
          </p>
          <div className={styles.projectDetailsInfo}>
            <div className={styles.projectDetailsInfoItem}>
              <p>Status</p>
              <p>Active</p>
            </div>
            <div className={styles.projectDetailsInfoItem}>
              <p>Project manager</p>
              <p>Michael Scott</p>
            </div>
            <div className={styles.projectDetailsInfoItem}>
              <p>Start date</p>
              <p>Jul 13, 2023</p>
            </div>
            <div className={styles.projectDetailsInfoItem}>
              <p>Target date</p>
              <p>Oct 20, 2023</p>
            </div>
            <div className={styles.projectDetailsInfoItem}>
              <p>Members</p>
              <p>John Doe</p>
            </div>
          </div>
          <div className={styles.projectDetailsTasks}>
            <h3>Recent tasks</h3>
            <div className={styles.projectDetailsTasksList}>
              {tasksData.slice(0, 3).map((task, index) => (
                <Link href="/ProjectTasks" key={index}>
                  <Task
                    id={task.id}
                    title={task.title}
                    priority={task.priority}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.projectDetailsProgress}>
            <h2 className={styles.projectDetailsProgressHeadline}>Progress</h2>
            <div className={styles.projectDetailsProgressLine}>
              <div />
              <p>43%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Projects;
