import styles from "@/styles/projects.module.scss";
import { CgArrowsExpandRight } from "react-icons/cg";
import Task from "@/components/ProjectsTask";
import Link from "@/components/Link";
import Image from "next/image";
import moment from "moment";
import {
  doc,
  deleteDoc,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useProjectDataContext } from "@/contexts/ProjectDataContext";

function ProjectDetails(props: any) {
  const { setProjectData, isProjectModalVisible, setisProjectModalVisible } =
    useProjectDataContext();
  const { name, description, createdAt, targetDate, archived, manager, tasks } =
    props.selectedProject;

  const formattedCreatedAt = moment
    .unix(createdAt.seconds)
    .format("MMMM DD, YYYY");
  const formattedTargetDate = moment(targetDate).format("MMMM DD, YYYY");

  async function deleteTask() {
    const q = query(
      collection(db, "companies", "DunderMifflin", "projects", "test", "tasks"),
      where("project", "==", "test")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    await deleteDoc(doc(db, "companies", "DunderMifflin", "projects", "test"));

    props.removeFromData(name);
    props.removeSelectedProject("");
  }

  function editTask() {
    setProjectData(props.selectedProject);
    setisProjectModalVisible(true);
  }

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
        {tasks.length > 0 && (
          <>
            <h3>Recent tasks</h3>
            <div className={styles.projectDetailsTasksList}>
              {tasks.map((task: any, index: number) => (
                <Link
                  href={`/dashboard/projects/${task.project}/${task.id}`}
                  key={task.id}
                >
                  <Task task={task} />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.projectDetailsProgress}>
        <h2 className={styles.projectDetailsProgressHeadline}>Progress</h2>
        <div className={styles.projectDetailsProgressLine}>
          <div />
          <p>43%</p>
        </div>
      </div>
      <button className={styles.edit} onClick={editTask}>
        Edit project
      </button>

      <button className={styles.delete} onClick={deleteTask}>
        Delete project
      </button>
    </>
  );
}

export default ProjectDetails;
