import styles from "@/styles/projectTasks.module.scss";
import { useState, useEffect } from "react";
import List from "@/components/ProjectTasksList";
import Board from "@/components/ProjectTasksBoard";
import Headline from "@/components/Headline";
import { motion, AnimatePresence } from "framer-motion";

function ProjectTasks() {
  const [filter, setFilter] = useState("list");
  const [listVisible, setListVisible] = useState(true);
  const [boardVisible, setBoardVisible] = useState(false);
  return (
    <section>
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
            setBoardVisible(true);
            setListVisible(false);
          }}
        >
          board
        </button>
        <button
          className={filter === "list" ? styles.active : ""}
          onClick={() => {
            setFilter("list");
            setListVisible(true);
            setBoardVisible(false);
          }}
        >
          list
        </button>
      </div>
      <div className={styles.lineDivider} />
      <AnimatePresence mode="wait">
        {boardVisible && (
          <motion.div
            key="board"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Board />
          </motion.div>
        )}

        {listVisible && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            exit={{ opacity: 0, y: 20 }}
          >
            <List />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectTasks;
