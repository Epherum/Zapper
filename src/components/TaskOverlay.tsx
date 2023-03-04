import styles from "@/styles/taskOverlay.module.scss";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { MdExpandMore } from "react-icons/md";
import { useModalDimContext } from "@/contexts/ModalDimContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { db } from "@/firebase/firebase-config";
import { collection, query, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";
export default function TaskOverlay() {
  const router = useRouter();
  const { isModalDimmed, setIsModalDimmed } = useModalDimContext();
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    assignee: "",
    targetDate: "",
    startDate: "",
    project: "",
  });
  const [docID, setDocID] = useState("");

  const addTask = async () => {
    const tasksCollection = collection(
      db,
      "companies",
      "DunderMifflin",
      "projects",
      "zapper",
      "tasks"
    );
    const docRef = await addDoc(tasksCollection, taskDetails);
    setDocID(docRef.id);
  };

  const taskMutation = useMutation(addTask);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    taskMutation.mutate();
    setIsModalDimmed(false);
    setTaskDetails({
      title: "",
      description: "",
      status: "",
      priority: "",
      assignee: "",
      targetDate: "",
      startDate: "",
      project: "",
    });
    router.push(`/projects/zapper/tasks/${docID}`);
  };

  const handleChange = (e: any) => {
    e.persist();
    setTaskDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(taskDetails);
  };

  return (
    <div
      className={styles.overlay}
      style={{
        zIndex: isModalDimmed ? "11" : "-1",
        opacity: isModalDimmed ? "1" : "0",
      }}
    >
      <div className={styles.top}>
        <div>
          <button className={styles.project}>TES</button>
          <MdExpandMore />
          <p className={styles.newTask}>New Task</p>
        </div>
        <button
          className={styles.close}
          onClick={() => setIsModalDimmed(false)}
        >
          <GrClose />
        </button>
      </div>
      <input
        className={styles.title}
        type="text"
        placeholder="Issue title"
        name="title"
        value={taskDetails.title}
        onChange={handleChange}
      />
      <textarea
        className={styles.description}
        placeholder="Add description..."
        name="description"
        value={taskDetails.description}
        onChange={handleChange}
      />
      <div className={styles.bottom}>
        <select name="status" id="status" onChange={handleChange}>
          <option selected>
            {taskDetails.status === "" ? "to do" : taskDetails.status}
          </option>
          <option value="in progress">in progress</option>
          <option value="done">done</option>
          <option value="backglog">backlog</option>
        </select>
        <select name="priority" id="priority" onChange={handleChange}>
          <option selected>
            {taskDetails.priority === "" ? "low" : taskDetails.priority}
          </option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <select name="assignee" id="assignee" onChange={handleChange}>
          <option selected disabled>
            {taskDetails.assignee === "" ? "assignee" : taskDetails.assignee}
          </option>
          <option value="John Doe">John Doe</option>
        </select>
        <input
          type="date"
          name="targetDate"
          id="targetDate"
          value={taskDetails.targetDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={taskDetails.startDate}
          onChange={handleChange}
        />
      </div>
      <div className={styles.submit}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
