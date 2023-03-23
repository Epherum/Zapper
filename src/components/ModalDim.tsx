import { useTaskDataContext } from "@/contexts/TaskDataContext";
import { useProjectDataContext } from "@/contexts/ProjectDataContext";
function ModalDim() {
  const { setTaskData, setisTaskModalVisible, isTaskModalVisible } =
    useTaskDataContext();
  const { setProjectData, setisProjectModalVisible, isProjectModalVisible } =
    useProjectDataContext();

  return (
    <div
      onClick={() => {
        setisTaskModalVisible(false);
        setisProjectModalVisible(false);
        setTaskData("");
        setProjectData("");
      }}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        transition: "all 0.3s ease-out",
        zIndex: isProjectModalVisible || isTaskModalVisible ? "10" : "-1",
        opacity: isProjectModalVisible || isTaskModalVisible ? "0.6" : "0",
      }}
    />
  );
}

export default ModalDim;
