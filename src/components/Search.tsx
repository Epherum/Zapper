import styles from "@/styles/search.module.scss";
import { IoSearchOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { RxGear } from "react-icons/rx";
import { BsBell } from "react-icons/bs";
export default function Search() {
  return (
    <div className={styles.search}>
      <div className={styles.searchInput}>
        <IoSearchOutline />
        <input type="text" placeholder="Search anything here" />
      </div>
      <div className={styles.icons}>
        <div className={styles.notificationGear}>
          <BsBell />
          <RxGear />
        </div>
        <VscAccount />
      </div>
    </div>
  );
}
