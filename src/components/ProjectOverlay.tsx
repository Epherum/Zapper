import styles from "@/styles/taskOverlay.module.scss";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { MdExpandMore } from "react-icons/md";
import { useQuery, useMutation } from "@tanstack/react-query";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  where,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useFormik, Field, FormikProvider } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { useProjectDataContext } from "@/contexts/ProjectDataContext";
import { tasksData } from "@/data/mockData";

export default function projectOverlay() {
  const router = useRouter();
  const {
    projectData,
    setProjectData,
    isProjectModalVisible,
    setisProjectModalVisible,
  } = useProjectDataContext();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      archived: false,
      name: "",
      description: "",
      targetDate: "",
      manager: "",
      members: [],
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (projectData) {
      formik.setValues({
        archived: projectData.archived,
        name: projectData.name,
        description: projectData.description,
        targetDate: projectData.targetDate,
        manager: projectData.manager,
        members: projectData.members,
      });
    } else {
      const timer = setTimeout(() => {
        formik.setValues({
          archived: false,
          name: "",
          description: "",
          targetDate: "",
          manager: "",
          members: [],
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [projectData]);

  function handleSubmit(e: any) {
    if (projectData) {
      editProjectMutation.mutate();
    } else {
      addProjectMutation.mutate();
    }
    setisProjectModalVisible(false);
    formik.resetForm();
    setProjectData("");
  }

  const getAllMembers = async () => {
    const membersCollection = collection(
      db,
      "companies",
      "DunderMifflin",
      "members"
    );

    const querySnapshot = await getDocs(membersCollection);
    const users = querySnapshot.docs.map((doc) => doc.data());
    console.log(users);
    return users;
  };

  const { data: membersData } = useQuery(["members"], getAllMembers);

  const addProject = async () => {
    const projectsCollection = doc(
      db,
      "companies",
      "DunderMifflin",
      "projects",
      formik.values.name
    );
    const createdAt = new Date();

    await setDoc(projectsCollection, {
      ...formik.values,
      createdAt,
    });

    queryClient.invalidateQueries(["currentUserprojects"]);
  };

  const editProject = async () => {
    const projectsCollection = doc(
      db,
      "companies",
      "DunderMifflin",
      "projects",
      projectData.name
    );

    const lastUpdated = new Date();

    await updateDoc(projectsCollection, {
      ...formik.values,
      name: projectData.name,
      lastUpdated,
    });
    queryClient.invalidateQueries(["projects", formik.values.name]);
  };

  const editProjectMutation = useMutation(editProject, {});

  const addProjectMutation = useMutation(addProject, {
    onSuccess: () => {
      router.push(`/dashboard/projects/${formik.values.name}`);
    },
  });

  return (
    <div
      className={styles.overlay}
      style={{
        zIndex: isProjectModalVisible ? "11" : "-1",
        opacity: isProjectModalVisible ? "1" : "0",
      }}
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.top}>
            <p className={styles.newTask}>New project</p>
            <button
              className={styles.close}
              onClick={() => setisProjectModalVisible(false)}
            >
              <GrClose />
            </button>
          </div>
          <input
            className={styles.title}
            type="text"
            placeholder="Project name"
            {...formik.getFieldProps("name")}
            required
            {...(projectData && { disabled: true })}
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
              name="manager"
              id="manager"
              onChange={formik.handleChange}
              className={styles.select}
              required
            >
              <option value="" disabled style={{ display: "none" }}>
                manager
              </option>
              {membersData &&
                membersData.map((member: any) => (
                  <option value={member.email} key={member.email}>
                    {member.email}
                  </option>
                ))}
            </Field>
            <Field
              as="select"
              name="members"
              id="members"
              onChange={formik.handleChange}
              className={styles.select}
              required
            >
              <option value="" disabled style={{ display: "none" }}>
                members
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
            <button type="submit">{projectData ? "Edit" : "Create"}</button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}
