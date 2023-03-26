import axios from "axios";

export async function getUserData(userEmail: string) {
  try {
    const user = await axios.get(`/api/users/${userEmail}`);
    return user.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function getTasksAssignedToUser(userEmail: string) {
  try {
    const tasks = await axios.get(`/api/tasks/user/${userEmail}`);
    return tasks.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function getProjectsAssignedToUser(userEmail: string) {
  try {
    const projects = await axios.get(`/api/projects/user/${userEmail}`);
    return projects.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProjects() {
  try {
    const projects = await axios.get(`/api/projects`);
    return projects.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProject(projectName: string) {
  try {
    const project = await axios.get(`/api/projects/${projectName}`);
    return project.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProjectTasks(projectName: string) {
  try {
    const tasks = await axios.get(`/api/tasks/project/${projectName}`);
    return tasks.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// export async function deleteTask(id: string, project: string) {
//   try {
//     const tasks = await axios.delete(`/api/tasks/${id}`);
//     return tasks.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }
