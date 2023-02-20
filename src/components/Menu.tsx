import styles from "@/styles/menu.module.scss";
import { GrHomeRounded } from "react-icons/gr";
import { VscAccount } from "react-icons/vsc";
import { BiTask } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import Link from "@/components/Link";

export default function Menu() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h1 className={styles.logo}>
          <Link href="/">zapper</Link>
        </h1>
        <ul>
          <li className={styles.icon}>
            <Link href="/">
              <GrHomeRounded />
            </Link>
          </li>
          <li className={styles.icon}>
            <Link href="/Profile">
              <VscAccount />
            </Link>
          </li>
          <li className={styles.icon}>
            <Link href="/ProjectTasks">
              <BiTask />
            </Link>
          </li>
          <li className={styles.icon}>
            <Link href="/Projects">
              <BsListTask />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
