import { db } from "@/firebase/firebaseConfig";
import { collection, query, getDocs, limit } from "firebase/firestore";

export default async function handler(req, res) {
  const projectsData = [];
  const projectsQuery = query(
    collection(db, "companies", "DunderMifflin", "projects")
  );
  const projectsSnapshot = await getDocs(projectsQuery);

  for (const projectDoc of projectsSnapshot.docs) {
    const project = projectDoc.data();

    const tasksQuery = query(
      collection(
        db,
        "companies",
        "DunderMifflin",
        "projects",
        projectDoc.id,
        "tasks"
      ),
      limit(3)
    );
    const tasksSnapshot = await getDocs(tasksQuery);
    const tasks = [];

    for (const issueDoc of tasksSnapshot.docs) {
      const issue = issueDoc.data();
      tasks.push(issue);
    }

    project.tasks = tasks;
    projectsData.push(project);
  }
  res.status(200).json(projectsData);
}
