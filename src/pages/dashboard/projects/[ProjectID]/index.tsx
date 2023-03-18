import styles from "@/styles/projectTasks.module.scss";
import { useState, useEffect } from "react";
import List from "@/components/ProjectTasksList";
import Board from "@/components/ProjectTasksBoard";
import Headline from "@/components/Headline";
import { motion, AnimatePresence } from "framer-motion";
import { filters, filterItem, divider } from "@/animations/projectTasks";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export default function ProjectTasks() {
  const [filter, setFilter] = useState("list");
  const [listVisible, setListVisible] = useState(true);
  const [boardVisible, setBoardVisible] = useState(false);

  const router = useRouter();
  const ProjectID = router.query.ProjectID as string | undefined;
  const headline = ProjectID
    ? ProjectID.charAt(0).toUpperCase() + ProjectID.slice(1)
    : "";

  async function getIssues() {
    const issuesQuery = query(
      //@ts-ignore
      collection(
        db,
        "companies",
        "DunderMifflin",
        "projects",
        ProjectID,
        "tasks"
      )
    );
    const issuesSnapshot = await getDocs(issuesQuery);
    const issues = [];

    for (const issueDoc of issuesSnapshot.docs) {
      const issue = { id: issueDoc.id, ...issueDoc.data() };
      issues.push(issue);
    }
    return issues;
  }

  const { isLoading, error, data } = useQuery(
    ["issues", ProjectID],
    getIssues,
    {}
  );

  return (
    <section>
      <>
        {ProjectID && (
          <Headline
            title={headline}
            //@ts-ignore
            location={["home", "projects", ProjectID]}
          />
        )}

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

        {data && (
          <AnimatePresence mode="wait">
            {boardVisible && (
              <motion.div
                key="board"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Board tasksData={data} project={ProjectID} />
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
                <List tasksData={data} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </>
    </section>
  );
}