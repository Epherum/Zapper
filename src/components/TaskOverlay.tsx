import styles from "@/styles/taskOverlay.module.scss";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { MdExpandMore } from "react-icons/md";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useFormik, Field, FormikProvider } from "formik";
import { useTaskDataContext } from "@/contexts/TaskDataContext";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createTask, updateTask, getProjects } from "@/lib/api";

export default function TaskOverlay() {
  const router = useRouter();
  const {
    taskData,
    setTaskData,
    isTaskModalVisible,
    setSubtaskProject,
    subtaskProject,
    setisTaskModalVisible,
  } = useTaskDataContext();
  const [taskUrl, setTaskUrl] = useState(["", ""]);
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "To do",
      priority: "low",
      assignee: "",
      targetDate: "",
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
        project: taskData.project,
      });
    } else if (subtaskProject[0]) {
      formik.setValues({
        title: "",
        description: "",
        status: "To do",
        priority: "low",
        assignee: "",
        targetDate: "",
        project: subtaskProject[0],
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
          project: "",
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [taskData, subtaskProject]);

  function handleSubmit() {
    if (taskData) {
      editTaskMutation.mutate();
    } else {
      addTaskMutation.mutate();
    }
  }

  const getAllMembers = async () => {
    const res = await axios.get("/api/users");
    return res.data;
  };

  const { data: membersData } = useQuery(["projectMembers"], getAllMembers, {
    enabled: isTaskModalVisible && !!formik.values.project,
  });

  const { data: projectsData } = useQuery(["projects"], getProjects, {
    enabled: isTaskModalVisible,
  });

  const editTaskMutation = useMutation(
    () =>
      updateTask(taskData.id, {
        ...formik.values,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["currentUserTasks"]);
        queryClient.invalidateQueries(["tasks", formik.values.project]);
        setisTaskModalVisible(false);
        setSubtaskProject(["", ""]);
        formik.resetForm();
      },
    }
  );

  const addTaskMutation = useMutation(
    () =>
      createTask({
        ...formik.values,
        subtaskOf: subtaskProject[1] || null,
      }),
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries(["currentUserTasks"]);
        queryClient.invalidateQueries(["tasks", formik.values.project]);
        setisTaskModalVisible(false);
        setSubtaskProject(["", ""]);
        formik.resetForm();
        setTaskUrl([formik.values.project, data.id]);
      },
    }
  );

  useEffect(() => {
    if (taskUrl[0] !== "") {
      router.push(`/dashboard/projects/${taskUrl[0]}/${taskUrl[1]}`);
    }
  }, [taskUrl]);

  return (
    <div
      className={styles.overlay}
      style={{
        zIndex: isTaskModalVisible ? "11" : "-1",
        opacity: isTaskModalVisible ? "1" : "0",
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
                  queryClient.invalidateQueries(["projectMembers"]);
                }}
                className={styles.select}
                {...(subtaskProject[0] && {
                  disabled: true,
                })}
                required
              >
                <option value="" disabled style={{ display: "none" }}>
                  Select a project
                </option>
              >
                <option value="" disabled style={{ display: "none" }}>
                  Select a project
                </option>
                {projectsData?.map((project: any) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </Field>
              <MdExpandMore />
              {subtaskProject[0] ? (
                <p className={styles.newTask}>New Subtask</p>
              ) : (
                <p className={styles.newTask}>New Task</p>
              )}
            </div>
            <button
              className={styles.close}
              onClick={() => {
                setisTaskModalVisible(false);
                setSubtaskProject(["", ""]);
              }}
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
              <option value="Backlog">Backlog</option>
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
            >
              <option value="" disabled style={{ display: "none" }}>
                Assignee
              </option>
              {membersData &&
                membersData.map((member: any) => (
                  <option value={member.email} key={member.email}>
                    {member.email}
                  </option>
                ))}
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
            <button type="submit">{taskData ? "Edit" : "Submit"}</button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}
