import styles from "@/styles/menu.module.scss";
import { GrHomeRounded } from "react-icons/gr";
import { VscAccount } from "react-icons/vsc";
import { BiTask } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import Link from "@/components/Link";
import { motion } from "framer-motion";
import { logo, menuItems, menuItem } from "@/animations/menu";

export default function Menu() {
  return (
    <nav className={styles.menu}>
      <motion.h1
        variants={logo}
        initial="hidden"
        animate="visible"
        className={styles.logo}
      >
        <Link href="/">zapper</Link>
      </motion.h1>
      <motion.ul variants={menuItems} initial="hidden" animate="visible">
        <motion.li variants={menuItem} className={styles.icon}>
          <Link href="/">
            <GrHomeRounded />
          </Link>
        </motion.li>

        <motion.li variants={menuItem} className={styles.icon}>
          <Link href="/ProjectTasks">
            <BiTask />
          </Link>
        </motion.li>
        <motion.li variants={menuItem} className={styles.icon}>
          <Link href="/Projects">
            <BsListTask />
          </Link>
        </motion.li>
        <motion.li variants={menuItem} className={styles.icon}>
          <Link href="/Profile">
            <VscAccount />
          </Link>
        </motion.li>
      </motion.ul>
    </nav>
  );
}
