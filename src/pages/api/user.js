import { db } from "@/firebase/firebaseConfig";
import { collection, getDoc, query, where, doc } from "firebase/firestore";

export default async function handler(req, res) {
  const email = req.body;

  const docRef = doc(db, "users", "wassimfekih3@gmail.com");
  const querySnapshot = await getDoc(docRef);
  const user = querySnapshot.data();

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}
