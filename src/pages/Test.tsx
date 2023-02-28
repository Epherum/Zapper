// import { useEffect, useState } from "react";
// import styles from "@/styles/circles.module.scss";

// export default function HomePage() {
//   const [dim, setDim] = useState(false);

//   function handleToggle() {
//     setDim((prev) => !prev);
//   }

//   useEffect(() => {
//     if (dim) {
//       document.body.classList.add(styles.noScroll);
//     } else {
//       document.body.classList.remove(styles.noScroll);
//     }
//   }, [dim]);

//   return (
//     <section>
//       <button onClick={handleToggle}>toggle</button>
//       <Dim dim={dim} setDim={setDim} />
//     </section>
//   );
// }

// function Dim({
//   dim,
//   setDim,
// }: {
//   dim: boolean;
//   setDim: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   return (
//     <>
//       <div
//         className={`${styles.dim} ${dim ? styles.dimActive : ""}`}
//         onClick={() => {
//           setDim(false);
//         }}
//       />
//     </>
//   );
// }
export default function Test() {
  return <></>;
}
