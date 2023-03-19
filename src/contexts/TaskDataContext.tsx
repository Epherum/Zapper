import { createContext, useContext, useState } from "react";

interface TaskDataContextType {
  taskData: any;
  setTaskData: React.Dispatch<React.SetStateAction<any>>;
}

export const TaskDataContext = createContext<TaskDataContextType>({
  taskData: "",
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

  return (
    <TaskDataContext.Provider value={{ taskData, setTaskData }}>
      {children}
    </TaskDataContext.Provider>
  );
};
