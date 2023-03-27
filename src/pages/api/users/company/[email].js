import { db } from "@/firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
export default async function handler(req, res) {
  const { email } = req.query;
  const docRef = doc(db, "companies", "DunderMifflin", "employees", email);
  const querySnapshot = await getDoc(docRef);
  const user = querySnapshot.data();

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}
