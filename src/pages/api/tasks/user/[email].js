import { db } from "@/firebase/firebaseConfig";
import {
  getDocs,
  getDoc,
  doc,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";

export default async function handler(req, res) {
  const { email } = req.query;

  const tasks = [];
  const usertasks = await getDocs(
    query(collectionGroup(db, "tasks"), where("assignee", "==", email))
  );

  if (usertasks === undefined || usertasks.length === 0) {
    res.status(200).json([]);
    return;
  }

  usertasks?.forEach((issue) => {
    const issueData = issue.data();
    tasks.push(issueData);
  });
  res.status(200).json(tasks);
}
