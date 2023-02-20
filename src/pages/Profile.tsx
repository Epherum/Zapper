import Headline from "@/components/Headline";
import styles from "@/styles/profile.module.scss";
import styles2 from "@/styles/projectTasks.module.scss";
import styles3 from "@/styles/dashboard.module.scss";
import { CgArrowsExpandRight } from "react-icons/cg";
import Project from "@/components/DashboardProject";
import profilepic from "../../public/profile.png";
import Tasks from "@/components/ProjectTasksTasks";
import Image from "next/image";
import { overviewData, tasksData, projectsData } from "@/data/mockData";

function Profile() {
  return (
    <section>
      <div className="circleBlue" />
      <div className="circleGreen" />

      <Headline title="Profile" location={["home", "Profile"]} />
      <div className={styles.lineDivider} />
      <div className={styles.ProfileInfoAndOverview}>
        <div className={styles.profileInfo}>
          <Image
            src={profilepic}
            alt="Picture of the author"
            placeholder="blur" // Optional blur-up while loading
          />
          <h2>Michael Scott</h2>
          <p className={styles.role}>Project Manager</p>
          <p className={styles.email}>notmichaelscott123@gmail.com</p>
        </div>
        <div className={styles.overview}>
          <div className={styles.overviewCard}>
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
          </div>
          <div className={styles.overviewCard}>
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
          </div>
        </div>
      </div>
      <div className={styles2.grid}>
        <div
          className={styles2.tasks}
          style={{
            marginTop: "min(-3.4rem, -3vw)",
          }}
        >
          <h2 className={`${styles2.tasksHeadline} ${styles2.first}`}>
            Assigned tasks
          </h2>
          <div className={styles2.tasksList}>
            {tasksData.slice(0, 6).map((task, index) => (
              <Tasks
                key={index}
                id={task.id}
                title={task.title}
                priority={task.priority}
                date={task.date}
              />
            ))}
          </div>
        </div>
        <div
          className={styles3.projects}
          style={{
            gridRow: 1,
          }}
        >
          <div className={styles3.projectsHeadline}>
            <p>Assigned projects</p>
            <CgArrowsExpandRight />
          </div>
          <div className={styles3.projectsList}>
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
    </section>
  );
}

export default Profile;
