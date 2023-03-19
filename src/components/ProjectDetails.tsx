import styles from "@/styles/projects.module.scss";
import { CgArrowsExpandRight } from "react-icons/cg";
import Task from "@/components/ProjectsTask";
import Link from "@/components/Link";
import Image from "next/image";
import moment from "moment";

function ProjectDetails({ selectedProject }: { selectedProject: any }) {
  const { name, description, createdAt, targetDate, archived, manager, tasks } =
    selectedProject;

  const formattedCreatedAt = moment
    .unix(createdAt.seconds)
    .format("MMMM DD, YYYY");
  const formattedTargetDate = moment(targetDate).format("MMMM DD, YYYY");

  return (
    <>
      <Link
        href={`/dashboard/projects/${name}`}
        className={styles.projectDetailsHeadline}
      >
        <h2>{name}</h2>
        <CgArrowsExpandRight />
      </Link>
      <p className={styles.projectDetailsDescription}>{description}</p>
      <div className={styles.projectDetailsInfo}>
        <div className={styles.projectDetailsInfoItem}>
          <p>Status</p>
          <p>{archived === true ? "archived" : "active"}</p>
        </div>
        <div className={styles.projectDetailsInfoItem}>
          <p>Project manager</p>
          <p>{manager}</p>
        </div>
        <div className={styles.projectDetailsInfoItem}>
          <p>Start date</p>
          <p>{formattedCreatedAt}</p>
        </div>
        <div className={styles.projectDetailsInfoItem}>
          <p>Target date</p>
          <p>{formattedTargetDate}</p>
        </div>
        <div className={styles.projectDetailsInfoItem}>
          <p>Members</p>
          <div className={styles.members}>
            {[
              "/profile1.png",
              "/profile2.png",
              "/profile.png",
              "/profile.png",
            ].map((item, index) => (
              <Image
                key={index}
                src={item}
                width={35}
                height={35}
                alt="Picture of the author"
                className={styles.member}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.projectDetailsTasks}>
        <h3>Recent tasks</h3>
        <div className={styles.projectDetailsTasksList}>
          {tasks.map((task: any, index: number) => (
            <Link href={`/dashboard/projects/${task.id}`} key={task.id}>
              <Task
                id={"ID LG-2"}
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
    </>
  );
}

export default ProjectDetails;
