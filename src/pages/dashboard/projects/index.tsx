import styles from "@/styles/projects.module.scss";
import { useState, useEffect } from "react";
import Project from "@/components/ProjectsProject";
import ProjectDetails from "@/components/ProjectDetails";
import Headline from "@/components/Headline";
import { AiOutlinePlus } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import {
  filters,
  filterItem,
  projectsHeadline,
  projects,
  projectItem,
  divider,
} from "@/animations/projects";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/api";

export default function Projects() {
  const [filter, setFilter] = useState("active");
  const [selectedProject, setSelectedProject] = useState();
  const [switchP, setSwitchP] = useState(false);

  const { data } = useQuery(["projects"], getProjects);

  return (
    <section>
      <Headline title="Projects" location={["home", "Projects"]} />
      <motion.div
        variants={filters}
        initial="hidden"
        animate="visible"
        className={styles.filters}
      >
        {["all", "active", "archived"].map((filterName, index) => (
          <motion.button
            key={index}
            variants={filterItem}
            className={filter === `${filterName}` ? styles.active : ""}
            onClick={() => {
              setFilter(`${filterName}`);
            }}
          >
            {filterName}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        variants={divider}
        initial="hidden"
        animate="visible"
        className={styles.lineDivider}
      />

      {data && (
        <div className={styles.grid}>
          <div className={styles.projects}>
            <motion.h2
              variants={projectsHeadline}
              initial="hidden"
              animate="visible"
              className={styles.projectsHeadline}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)} projects
            </motion.h2>
            <motion.div
              variants={projects}
              initial="hidden"
              animate="visible"
              className={styles.projectsList}
            >
              {data.map((project: any) => (
                <motion.div
                  key={project.name}
                  variants={projectItem}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={selectedProject === project ? styles.active : ""}
                  onClick={() => {
                    //TODO fix the bug where if you click on
                    //TODO the same project twice, it animates for no reason
                    setSelectedProject(project);
                    setSwitchP((prev) => !prev);
                  }}
                >
                  <Project
                    title={project.name}
                    tasks={project.tasks.length}
                    overdue={3}
                    createdAt={project.createdAt}
                    targetDate={project.targetDate}
                  />
                </motion.div>
              ))}

              <div className={styles.addProject}>
                <p>Create new project</p>
                <AiOutlinePlus />
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={divider}
            initial="hidden"
            animate="visible"
            className={styles.gridLineDivider}
          />
          <AnimatePresence mode="wait">
            {selectedProject && switchP && (
              <motion.div
                key="1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                exit={{ opacity: 0, y: 20 }}
                className={styles.projectDetails}
              >
                <ProjectDetails selectedProject={selectedProject} />
              </motion.div>
            )}
            {selectedProject && !switchP && (
              <motion.div
                key="2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                exit={{ opacity: 0, y: 20 }}
                className={styles.projectDetails}
              >
                <ProjectDetails selectedProject={selectedProject} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
