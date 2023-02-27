import styles from "@/styles/projectTasks.module.scss";
import { useState, useEffect } from "react";
import List from "@/components/ProjectTasksList";
import Board from "@/components/ProjectTasksBoard";
import Headline from "@/components/Headline";
import { motion, AnimatePresence } from "framer-motion";
import { filters, filterItem, divider } from "@/animations/projectTasks";

function ProjectTasks() {
  const [filter, setFilter] = useState("list");
  const [listVisible, setListVisible] = useState(true);
  const [boardVisible, setBoardVisible] = useState(false);

  return (
    <section>
      <Headline
        title="Missguided"
        location={["home", "projects", "Missguided"]}
      />

      <motion.div
        variants={filters}
        initial="hidden"
        animate="visible"
        className={styles.filters}
      >
        <motion.button
          variants={filterItem}
          className={filter === "board" ? styles.active : ""}
          onClick={() => {
            setFilter("board");
            setListVisible(false);
            setBoardVisible(true);
          }}
        >
          board
        </motion.button>
        <motion.button
          variants={filterItem}
          className={filter === "list" ? styles.active : ""}
          onClick={() => {
            setFilter("list");
            setListVisible(true);
            setBoardVisible(false);
          }}
        >
          list
        </motion.button>
      </motion.div>

      <motion.div
        variants={divider}
        initial="hidden"
        animate="visible"
        className={styles.lineDivider}
      />

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
