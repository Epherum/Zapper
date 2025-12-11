import styles from "@/styles/taskOverlay.module.scss";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useFormik, Field, FormikProvider } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { useProjectDataContext } from "@/contexts/ProjectDataContext";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { createProject, updateProject } from "@/lib/api";

export default function ProjectOverlay() {
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

  const getAllEmployees = async () => {
    const res = await axios.get("/api/users");
    return res.data;
  };

  const { data: employeesData } = useQuery(["allEmployees"], getAllEmployees, {
    enabled: !!isProjectModalVisible,
  });

  const editProjectMutation = useMutation(
    () =>
      updateProject(projectData.id || projectData.name, {
        description: formik.values.description,
        targetDate: formik.values.targetDate,
        archived: formik.values.archived,
        manager: formik.values.manager,
        members: formik.values.members,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  const addProjectMutation = useMutation(
    () =>
      createProject({
        name: formik.values.name,
        description: formik.values.description,
        targetDate: formik.values.targetDate,
        manager: formik.values.manager,
        members: formik.values.members,
      }),
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries(["projects"]);
        router.push(`/dashboard/projects/${data.name || data.id}`);
      },
    }
  );

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
              {employeesData &&
                employeesData.map((member: any) => (
                  <option value={member.email} key={member.email}>
                    {member.email}
                  </option>
                ))}
            </Field>
            {employeesData && (
              <Field name="fruit">
                {({ field }: any) => (
                  <Select
                    {...field}
                    options={employeesData.map((member: any) => ({
                      value: member.email,
                      label: member.email,
                    }))}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "members",
                        //@ts-ignore
                        e.map((e: any) => e.value)
                      );
                    }}
                    isClearable={true}
                    isSearchable={true}
                    isMulti
                  />
                )}
              </Field>
            )}

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
