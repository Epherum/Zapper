import styles from "@/styles/projectTasks.module.scss";
import { useState, useEffect } from "react";
import List from "@/components/ProjectTasksList";
import Board from "@/components/ProjectTasksBoard";
import Headline from "@/components/Headline";
import { motion, AnimatePresence } from "framer-motion";
import { filters, filterItem, divider } from "@/animations/projectTasks";
import { useRouter } from "next/router";
import {
  useQuery,
  Mutation,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getProjectTasks } from "@/lib/api";

export default function ProjectTasks() {
  const [filter, setFilter] = useState("list");
  const [listVisible, setListVisible] = useState(true);
  const [boardVisible, setBoardVisible] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const ProjectID = router.query.ProjectID as string;

  const { data } = useQuery(
    ["tasks", ProjectID],
    () => getProjectTasks(ProjectID),

    {
      enabled: !!ProjectID,
    }
  );

  function removeFromData(id: string) {
    queryClient.setQueryData(["tasks", ProjectID], (prevData: any) => {
      const newData = prevData?.filter((item: any) => item.id !== id);
      return newData;
    });
  }

  return (
    <section>
      <>
        {ProjectID && (
          <Headline
            title={ProjectID}
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
                <List tasksData={data} removeFromData={removeFromData} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </>
    </section>
  );
}
