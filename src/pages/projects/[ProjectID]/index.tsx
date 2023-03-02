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
import { db } from "../../../../firebase-config";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

export default function ProjectTasks({ issues }: { issues: [] }) {
  const [filter, setFilter] = useState("list");
  const [listVisible, setListVisible] = useState(true);
  const [boardVisible, setBoardVisible] = useState(false);
  const router = useRouter();
  const title =
    //@ts-ignore
    router.query["ProjectID"].charAt(0).toUpperCase() +
    //@ts-ignore
    router.query["ProjectID"].slice(1);
  console.log(issues);
  return (
    <section>
      <Headline
        title={title}
        //@ts-ignore
        location={["home", "projects", router.query["ProjectID"]]}
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
            <List issues={issues} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export async function getServerSideProps(context: any) {
  const { ProjectID } = context.params;
  const issuesQuery = query(
    collection(
      db,
      "companies",
      "DunderMifflin",
      "projects",
      ProjectID,
      "issues"
    )
  );
  const issuesSnapshot = await getDocs(issuesQuery);
  const issues = [];

  for (const issueDoc of issuesSnapshot.docs) {
    const issue = issueDoc.data();
    issues.push(issue);
  }

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=59"
  );

  return {
    props: { issues },
  };
}
