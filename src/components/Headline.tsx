import styles from "@/styles/headline.module.scss";
import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

function Headline({ title, location }: { title: string; location: string[] }) {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);
  return (
    <div className={styles.headline}>
      <div className={styles.title}>
        <p>
          {/* home &gt; <span>Missguided tasks</span> */}
          {location.map((item, index) => {
            if (index === location.length - 1) {
              return (
                <span className={styles.crumbsLast} key={index}>
                  {item}
                </span>
              );
            } else {
              return <span key={index}>{item} &gt; </span>;
            }
          })}
        </p>
        <h1>{title}</h1>
      </div>
      <div className={styles.timeAndButton}>
        <div className={styles.timeAndIcon}>
          <MdOutlineDateRange />
          {/* <p className={styles.time}>
            {dateState.toLocaleDateString("en-GB", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            &nbsp;
            {dateState.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p> */}
        </div>
        <button className={styles.button}>
          <AiOutlinePlus />
          <p>New Task</p>
        </button>
      </div>
    </div>
  );
}

export default Headline;
