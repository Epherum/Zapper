import Headline from "@/components/Headline";
import styles from "@/styles/userProfile.module.scss";
import styles2 from "@/styles/projectTasks.module.scss";
import styles3 from "@/styles/dashboard.module.scss";
import Project from "@/components/DashboardProject";
import profilepic from "../../public/profile.png";
import Tasks from "@/components/ProjectTasksTasks";
import Image from "next/image";
import { overviewData, tasksData, projectsData } from "@/data/mockData";
import { motion } from "framer-motion";
import {
  profile,
  profileItem,
  overview,
  overviewItem,
  projectsHeadline,
  projects,
  projectItem,
  divider,
} from "@/animations/profile";

function Profile() {
  return (
    <section>
      <Headline title="Profile" location={["home", "Profile"]} />
      <motion.div
        variants={divider}
        initial="hidden"
        animate="visible"
        className={styles.lineDivider}
      />
      <div className={styles.ProfileInfoAndOverview}>
        <motion.div
          variants={profile}
          initial="hidden"
          animate="visible"
          className={styles.profileInfo}
        >
          <motion.div variants={profileItem}>
            <Image
              src={profilepic}
              alt="Picture of the author"
              placeholder="blur"
              className={styles.profilePic}
            />
          </motion.div>
          <motion.h2 variants={profileItem} className={styles.name}>
            Michael Scott
          </motion.h2>
          <motion.p variants={profileItem} className={styles.role}>
            Project Manager
          </motion.p>
          <motion.p variants={profileItem} className={styles.email}>
            notmichaelscott123@gmail.com
          </motion.p>
        </motion.div>
        <motion.div
          variants={overview}
          initial="hidden"
          animate="visible"
          className={styles.overview}
        >
          <motion.div variants={overviewItem} className={styles.overviewCard}>
            {overviewData.slice(0, 2).map((item, index) => (
              <div key={index} className={styles.overviewItem}>
                <h2 className={styles.overviewItemTitle}>{item.title}</h2>
                <div className={styles.overviewItemContent}>
                  <p>
                    {item.tasks} <span>tasks</span>
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div variants={overviewItem} className={styles.overviewCard}>
            {overviewData.slice(2, 4).map((item, index) => (
              <div key={index} className={styles.overviewItem}>
                <h2 className={styles.overviewItemTitle}>{item.title}</h2>
                <div className={styles.overviewItemContent}>
                  <p>
                    {item.tasks} <span>tasks</span>
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <div className={styles2.grid}>
        <div
          className={styles2.tasks}
          style={{
            marginTop: "min(4rem, -2.3vw)",
          }}
        >
          <motion.h2
            variants={projectsHeadline}
            initial="hidden"
            animate="visible"
            className={`${styles2.tasksHeadline} ${styles2.first}`}
          >
            Assigned tasks
          </motion.h2>
          <motion.div
            variants={projects}
            initial="hidden"
            animate="visible"
            className={styles2.tasksList}
          >
            {tasksData.slice(0, 6).map((task, index) => (
              <motion.div key={index} variants={projectItem}>
                <Tasks
                  id={task.idd}
                  title={task.title}
                  priority={task.priority}
                  date={task.date}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div
          className={styles3.projects}
          style={{
            gridRow: 1,
          }}
        >
          <motion.div
            variants={projectsHeadline}
            initial="hidden"
            animate="visible"
            className={styles.projectsHeadline}
          >
            <p>Assigned projects</p>
          </motion.div>
          <motion.div
            variants={projects}
            initial="hidden"
            animate="visible"
            className={styles3.projectsList}
          >
            {projectsData.map((item, index) => (
              <motion.div key={index} variants={projectItem}>
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

export default Profile;
