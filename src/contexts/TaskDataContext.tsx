import { createContext, useContext, useState } from "react";

interface TaskDataContextType {
  taskData: any;
  isTaskModalVisible: boolean;
  setTaskData: React.Dispatch<React.SetStateAction<any>>;
  setisTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  subtaskProject: [string, string];
  setSubtaskProject: React.Dispatch<React.SetStateAction<[string, string]>>;
}

export const TaskDataContext = createContext<TaskDataContextType>({
  taskData: "",
  setisTaskModalVisible: () => {},
  isTaskModalVisible: false,
  setTaskData: () => {},
  subtaskProject: ["", ""],
  setSubtaskProject: () => {},
});

interface TaskDataProviderProps {
  children: React.ReactNode;
}

export function useTaskDataContext() {
  return useContext(TaskDataContext);
}
export const TaskDataProvider: React.FC<TaskDataProviderProps> = ({
  children,
}: any) => {
  const [taskData, setTaskData] = useState("");
  const [isTaskModalVisible, setisTaskModalVisible] = useState(false);
  const [subtaskProject, setSubtaskProject] = useState(["", ""]);

  return (
    <TaskDataContext.Provider
      value={{
        taskData,
        setTaskData,
        isTaskModalVisible,
        setisTaskModalVisible,
        subtaskProject,
        setSubtaskProject,
      }}
    >
      {children}
    </TaskDataContext.Provider>
  );
};
