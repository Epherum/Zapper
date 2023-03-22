import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export default async function handler(req, res) {
  const { id } = req.query;
  const tasksQuery = query(
    collection(db, "companies", "DunderMifflin", "projects", id, "tasks")
  );
  const tasksSnapshot = await getDocs(tasksQuery);
  const tasks = [];

  for (const taskDoc of tasksSnapshot.docs) {
    const task = { id: taskDoc.id, ...taskDoc.data() };
    tasks.push(task);
  }

  res.status(200).json(tasks);
}
