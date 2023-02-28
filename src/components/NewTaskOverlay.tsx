import styles from "@/styles/newTaskOverlay.module.scss";
import { GrClose } from "react-icons/gr";
import { MdExpandMore } from "react-icons/md";
import { useModalDimContext } from "@/contexts/ModalDimContext";

function NewTaskOverlay() {
  const { isModalDimmed, setIsModalDimmed } = useModalDimContext();

  return (
    <div
      className={styles.overlay}
      style={{
        zIndex: isModalDimmed ? "11" : "-1",
        opacity: isModalDimmed ? "1" : "0",
      }}
    >
      <div
        className={styles.top}
        style={{
          zIndex: isModalDimmed ? "11" : "-1",
          opacity: isModalDimmed ? "1" : "0",
        }}
      >
        <div>
          <button className={styles.project}>TES</button>
          <MdExpandMore />
          <p className={styles.newTask}>New Task</p>
        </div>
        <button className={styles.close}>
          {" "}
          <GrClose />
        </button>
      </div>
      <input className={styles.title} type="text" placeholder="Issue title" />
      <textarea
        className={styles.description}
        placeholder="Add description..."
      />
      <div className={styles.bottom}>
        <button>Backlog</button>
        <button>Priority</button>
        <button>Assignee</button>
        <button>Jul 15 - Jul 25</button>
      </div>
      <div className={styles.submit}>
        <button>Submit</button>
      </div>
    </div>
  );
}

export default NewTaskOverlay;
