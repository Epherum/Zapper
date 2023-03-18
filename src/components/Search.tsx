import styles from "@/styles/search.module.scss";
import { IoSearchOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { RxGear } from "react-icons/rx";
import { BsBell } from "react-icons/bs";
import { motion } from "framer-motion";
import { search, icons } from "@/animations/search";
import { signOut } from "next-auth/react";
export default function Search() {
  return (
    <div className={styles.search}>
      <motion.div
        variants={search}
        initial="hidden"
        animate="visible"
        className={styles.searchInput}
      >
        <IoSearchOutline />
        <input type="text" placeholder="Search anything here" />
      </motion.div>
      <motion.div
        variants={icons}
        initial="hidden"
        animate="visible"
        className={styles.icons}
      >
        <div className={styles.notificationGear}>
          <BsBell />
          <RxGear />
        </div>
        <div
          onClick={(_) =>
            signOut({
              callbackUrl: "/",
            })
          }
          className={styles.profile}
        >
          <VscAccount />
        </div>
      </motion.div>
    </div>
  );
}
