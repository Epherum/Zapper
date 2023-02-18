import styles from "@/styles/projectTasks.module.scss";
import { useState } from "react";
import List from "@/components/ProjectTasksList";
import Board from "@/components/ProjectTasksBoard";
import Headline from "@/components/Headline";
function ProjectTasks() {
  const [filter, setFilter] = useState("list");

  return (
    <>
      <div className="circleBlue" />
      <div className="circleGreen" />
      <Headline
        title="Missguided"
        location={["home", "projects", "Missguided"]}
      />

      <div className={styles.filters}>
        <button
          className={filter === "board" ? styles.active : ""}
          onClick={() => {
            setFilter("board");
          }}
        >
          board
        </button>
        <button
          className={filter === "list" ? styles.active : ""}
          onClick={() => {
            setFilter("list");
          }}
        >
          list
        </button>
      </div>
      <div className={styles.lineDivider} />
      {filter === "board" ? <Board /> : <List />}
    </>
  );
}

export default ProjectTasks;
