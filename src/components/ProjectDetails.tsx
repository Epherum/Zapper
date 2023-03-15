import styles from "@/styles/projects.module.scss";
import { CgArrowsExpandRight } from "react-icons/cg";
import Task from "@/components/ProjectsTask";
import { projectsData, tasksData } from "@/data/mockData";
import Link from "@/components/Link";
import Image from "next/image";
import { useRouter } from "next/router";

function ProjectDetails({
  title,
  description,
  archived,
  manager,
  startDate,
  targetDate,
}: {
  title: string;
  description: string;
  archived: boolean;
  manager: string;
  startDate: string;
  targetDate: string;
}) {
  const router = useRouter();
  return (
    <>
      <Link
        href={`/dashboard/projects/${title}`}
        className={styles.projectDetailsHeadline}
      >
        <h2>{title}</h2>
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
          <p>{startDate}</p>
        </div>
        <div className={styles.projectDetailsInfoItem}>
          <p>Target date</p>
          <p>{targetDate}</p>
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
          {tasksData.slice(0, 3).map((task: any, index: number) => (
            <Link href="/dashboard/projects/[id]" key={index}>
              <Task id={task.idd} title={task.title} priority={task.priority} />
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
