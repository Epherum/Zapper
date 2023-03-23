import { createContext, useContext, useState } from "react";

interface TaskDataContextType {
  taskData: any;
  isTaskModalVisible: boolean;
  setTaskData: React.Dispatch<React.SetStateAction<any>>;
  setisTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskDataContext = createContext<TaskDataContextType>({
  taskData: "",
  setisTaskModalVisible: () => {},
  isTaskModalVisible: false,
  setTaskData: () => {},
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

  return (
    <TaskDataContext.Provider
      value={{
        taskData,
        setTaskData,
        isTaskModalVisible,
        setisTaskModalVisible,
      }}
    >
      {children}
    </TaskDataContext.Provider>
  );
};
