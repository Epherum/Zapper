import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
export default function Test() {
  const [data, setData] = useState<any>(null);

  const getData = async () => {
    const projectRef = doc(db, "companies", "ZZCz2Wl7Vt6E7SFftrmh");
    const docSnap = await getDoc(projectRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Test</h1>
      <p>{data?.name}</p>
    </>
  );
}
