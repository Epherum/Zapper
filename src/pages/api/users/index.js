import { db } from "@/firebase/firebaseConfig";
import { collection, getDoc, query, where, doc } from "firebase/firestore";

export default function handler(req, res) {
  console.log("users");
  res.status(200).json({ name: "users" });
}
