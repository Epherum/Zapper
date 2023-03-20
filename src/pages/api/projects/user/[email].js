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

  const projects = [];
  const userProjects = await getDocs(
    query(
      collectionGroup(db, "projects"),
      where("members", "array-contains", email)
    )
  );
  userProjects?.forEach((issue) => {
    const issueData = issue.data();
    issueData.id = issue.id;
    projects.push(issueData);
  });

  res.status(200).json(projects);
}
