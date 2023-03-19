import styles from "@/styles/projects.module.scss";
import Image from "next/image";
import moment from "moment";
function ProjectsProject({
  title,
  tasks,
  overdue,
  createdAt,
  targetDate,
}: {
  title: string;
  tasks: number;
  overdue: number;
  createdAt: any;
  targetDate: string;
}) {
  const formattedCreatedAt = moment.unix(createdAt.seconds).format("MMMM DD");
  const formattedTargetDate = moment(targetDate).format("MMMM DD");

  return (
    <div className={styles.project}>
      <div className={styles.projectLeftSide}>
        <div className={styles.projectInfo}>
          <p>{title}</p>
          <p>
            {tasks} tasks <span>•</span> {overdue} overdue
          </p>
        </div>
      </div>
      <div className={styles.projectRightSide}>
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
        <p>
          {formattedCreatedAt} - {formattedTargetDate}
        </p>
      </div>
    </div>
  );
}
export default ProjectsProject;
