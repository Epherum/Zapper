import styles from "@/styles/headline.module.scss";
import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import { crumbs, headline, buttons } from "@/animations/headline";
import { useRouter } from "next/router";
import { useModalDimContext } from "@/contexts/ModalDimContext";

function Headline({ title, location }: { title: string; location: string[] }) {
  const { isModalDimmed, setIsModalDimmed } = useModalDimContext();
  const [formattedDate, setFormattedDate] = useState("");
  const [titleText, setText] = useState(title);
  const router = useRouter();
  const formatDate = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const newFormattedDate = `${month} ${day} ${year} ${formattedHours}:${formattedMinutes} ${ampm}`;

    setFormattedDate(newFormattedDate);
  };

  useEffect(() => {
    formatDate();

    const intervalId = setInterval(() => {
      formatDate();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.headline}>
      <motion.div className={styles.crumbsAndTitle}>
        <motion.p
          variants={crumbs}
          initial="hidden"
          animate="visible"
          className={styles.crumbs}
        >
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
        </motion.p>
        {router.pathname === "/TaskDetails" && (
          <motion.h1
            contentEditable={true}
            variants={headline}
            initial="hidden"
            animate="visible"
            className={styles.title}
          >
            {titleText}
          </motion.h1>
        )}
        {router.pathname !== "/TaskDetails" && (
          <motion.h1
            variants={headline}
            initial="hidden"
            animate="visible"
            className={styles.title}
          >
            {titleText}
          </motion.h1>
        )}
      </motion.div>

      <motion.div
        variants={buttons}
        initial="hidden"
        animate="visible"
        className={styles.timeAndButton}
      >
        <div className={styles.timeAndIcon}>
          <MdOutlineDateRange />
          <p className={styles.time}>{formattedDate}</p>
        </div>
        <button
          className={styles.button}
          onClick={() => {
            setIsModalDimmed(!isModalDimmed);
          }}
        >
          <AiOutlinePlus />
          <p>New Task</p>
        </button>
      </motion.div>
    </div>
  );
}

export default Headline;
