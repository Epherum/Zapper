import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { id } = req.query;
  const projectRef = doc(db, "companies", "DunderMifflin", "projects", id);
  const projectSnap = await getDoc(projectRef);
  const projectData = projectSnap.data();

  res.status(200).json(projectData);
}
