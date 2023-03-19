import { useEffect } from "react";
import { useModalDimContext } from "@/contexts/ModalDimContext";
import { useTaskDataContext } from "@/contexts/TaskDataContext";
function ModalDim() {
  const { isModalDimmed, setIsModalDimmed } = useModalDimContext();
  const { taskData, setTaskData } = useTaskDataContext();

  // useEffect(() => {
  //   const html = document.documentElement;
  //   if (isModalDimmed) {
  //     html.style.overflow = "hidden";
  //     html.style.height = "100%";
  //   } else {
  //     html.style.overflow = "auto";
  //     html.style.height = "auto";
  //   }
  // }, [isModalDimmed]);

  return (
    <div
      onClick={() => {
        setIsModalDimmed(false);
        setTaskData("");
      }}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        transition: "all 0.3s ease-out",
        zIndex: isModalDimmed ? "10" : "-1",
        opacity: isModalDimmed ? "0.6" : "0",
      }}
    />
  );
}

export default ModalDim;
