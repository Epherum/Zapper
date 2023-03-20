import axios from "axios";

async function getUserData(userEmail: string) {
  try {
    const user = await axios.get(`/api/users/${userEmail}`);
    return user.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function getTasksAssignedToUser(userEmail: string) {
  try {
    const tasks = await axios.get(`/api/tasks/user/${userEmail}`);
    return tasks.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function getProjectsAssignedToUser(userEmail: string) {
  try {
    const projects = await axios.get(`/api/projects/user/${userEmail}`);
    return projects.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { getUserData, getTasksAssignedToUser, getProjectsAssignedToUser };
