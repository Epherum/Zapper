import styles from "@/styles/search.module.scss";
import { LuSearch, LuUserRound, LuSettings, LuBell } from "react-icons/lu";
import { motion } from "framer-motion";
import { search, icons } from "@/animations/search";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
export default function Search() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.search}>
      <motion.div
        variants={search}
        initial="hidden"
        animate="visible"
        className={styles.searchInput}
      >
        <LuSearch />
        <input type="text" placeholder="Search anything here" />
      </motion.div>
      <motion.div
        variants={icons}
        initial="hidden"
        animate="visible"
        className={styles.icons}
      >
        <div className={styles.notificationGear}>
          <LuBell />
          <LuSettings />
        </div>
        <div className={styles.profile} ref={profileRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className={styles.profileButton}
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
          >
            <LuUserRound />
          </button>
          {isProfileOpen && (
            <div className={styles.profileMenu} role="menu">
              <button
                type="button"
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
                className={styles.profileMenuItem}
                role="menuitem"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
