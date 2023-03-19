import styles from "@/styles/taskOverlay.module.scss";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { MdExpandMore } from "react-icons/md";
import { useModalDimContext } from "@/contexts/ModalDimContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc, updateDoc, where, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useFormik, Field, FormikProvider } from "formik";
import { useTaskDataContext } from "@/contexts/TaskDataContext";
import moment from "moment";
export default function TaskOverlay() {
  const router = useRouter();
  const { isModalDimmed, setIsModalDimmed } = useModalDimContext();
  const { taskData, setTaskData } = useTaskDataContext();
  const [project, setProject] = useState("");
  const [docID, setDocID] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "To do",
      priority: "low",
      assignee: "",
      targetDate: "",
      startDate: "",
      project: "",
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (taskData) {
      formik.setValues({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        assignee: taskData.assignee,
        targetDate: taskData.targetDate,
        startDate: taskData.startDate,
        project: taskData.project,
      });
    } else {
      const timer = setTimeout(() => {
        formik.setValues({
          title: "",
          description: "",
          status: "To do",
          priority: "low",
          assignee: "",
          targetDate: "",
          startDate: "",
          project: "",
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [taskData]);

  function handleSubmit(e: any) {
    if (taskData) {
      editTaskMutation.mutate();
    } else {
      addTaskMutation.mutate();
    }
    setIsModalDimmed(false);
    formik.resetForm();
  }

  const addTask = async () => {
    const tasksCollection = collection(
      db,
      "companies",
      "DunderMifflin",
      "projects",
      formik.values.project,
      "tasks"
    );
    const formattedDate = moment(formik.values.targetDate).format(
      "MMM Do YYYY"
    );
    const docRef = await addDoc(tasksCollection, {
      ...formik.values,
      targetDate: formattedDate,
    });
    const docId = docRef.id;
    await updateDoc(docRef, { id: docId });
    setDocID(docId);
  };

  const editTask = async () => {
    const tasksCollection = collection(
      db,
      "companies",
      "DunderMifflin",
      "projects",
      formik.values.project,
      "tasks"
    );
    const formattedTargetDate = moment(formik.values.targetDate).format(
      "MMM Do YYYY"
    );

    const formattedStartDate = moment(new Date()).format("MMM Do YYYY");

    await updateDoc(doc(tasksCollection, taskData.id), {
      ...formik.values,
      targetDate: formattedTargetDate,
      startDate: formattedStartDate,
    });
    setDocID(taskData.id);
  };

  const editTaskMutation = useMutation(editTask);

  const addTaskMutation = useMutation(addTask);

  useEffect(() => {
    if (docID !== "") {
      router.push(`/dashboard/projects/${project}/${docID}`);
    }
  }, [docID]);

  return (
    <div
      className={styles.overlay}
      style={{
        zIndex: isModalDimmed ? "11" : "-1",
        opacity: isModalDimmed ? "1" : "0",
      }}
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.top}>
            <div>
              <Field
                as="select"
                name="project"
                id="project"
                onChange={(e: any) => {
                  formik.handleChange(e);
                  setProject(e.target.value);
                }}
                className={styles.select}
                required
                defaultValue={""}
              >
                <option value="" disabled style={{ display: "none" }}>
                  Select a project
                </option>
                <option value="Zapper">Zapper</option>
                <option value="Missguided">Missguided</option>
              </Field>
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
            {...formik.getFieldProps("title")}
            required
          />
          <textarea
            className={styles.description}
            placeholder="Add description..."
            {...formik.getFieldProps("description")}
            required
          />
          <div className={styles.bottom}>
            <Field
              as="select"
              name="status"
              id="status"
              onChange={formik.handleChange}
              className={styles.select}
            >
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Done">Done</option>
              <option value="Backglog">Backlog</option>
            </Field>
            <Field
              as="select"
              name="priority"
              id="priority"
              onChange={formik.handleChange}
              className={styles.select}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </Field>
            <Field
              as="select"
              name="assignee"
              id="assignee"
              onChange={formik.handleChange}
              className={styles.select}
              required
              defaultValue={""}
            >
              <option value="" disabled style={{ display: "none" }}>
                Assignee
              </option>
              <option value="John Doe">John Doe</option>
            </Field>

            <Field name="targetDate">
              {({ field, form }: { field: any; form: any }) => (
                <input
                  type="date"
                  {...field}
                  {...formik.getFieldProps("targetDate")}
                  className={styles.select}
                  alt="target date"
                  required
                  format="MM/dd/yyyy"
                />
              )}
            </Field>
          </div>
          <div className={styles.submit}>
            <button type="submit">{taskData ? "Edit" : "Sumbit"}</button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}
