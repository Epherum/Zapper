import styles from "@/styles/menu.module.scss";
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuFolderKanban,
  LuUserRound,
} from "react-icons/lu";
import Link from "@/components/Link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Menu() {
  const [isExpanded, setIsExpanded] = useState(false);

  const sidebarVariants = {
    expanded: {
      width: 220,
      paddingLeft: 48,
      paddingRight: 20,
      boxShadow: "0 18px 40px rgba(0, 0, 0, 0.12)",
      transition: { type: "spring", stiffness: 260, damping: 30 },
    },
    collapsed: {
      width: 90,
      paddingLeft: 24,
      paddingRight: 16,
      boxShadow: "none",
      transition: { type: "spring", stiffness: 260, damping: 30 },
    },
  };

  return (
    <>
      <div
        className={`${styles.menuOverlay} ${isExpanded ? styles.menuOverlayVisible : ""}`}
      />
      <motion.nav
        className={styles.menu}
        variants={sidebarVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        data-expanded={isExpanded ? "true" : "false"}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <ul className={styles.menuList}>
          <li className={styles.logoItem}>
            <Link href="/dashboard">
              <span className={styles.logoText}>
                <span className={styles.logoShort}>z</span>
                <span className={styles.logoFull}>zapper</span>
              </span>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/dashboard">
              <span className={styles.icon}>
                <LuLayoutDashboard />
              </span>
              <span className={styles.label}>Home</span>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/dashboard/projects/Zapper">
              <span className={styles.icon}>
                <LuClipboardList />
              </span>
              <span className={styles.label}>Tasks</span>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/dashboard/projects">
              <span className={styles.icon}>
                <LuFolderKanban />
              </span>
              <span className={styles.label}>Projects</span>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/dashboard/profile">
              <span className={styles.icon}>
                <LuUserRound />
              </span>
              <span className={styles.label}>Profile</span>
            </Link>
          </li>
        </ul>
      </motion.nav>
    </>
  );
}
