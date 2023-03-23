import { createContext, useContext, useState } from "react";

interface ProjectDataContextType {
  projectData: any;
  isProjectModalVisible: boolean;
  setProjectData: React.Dispatch<React.SetStateAction<any>>;
  setisProjectModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectDataContext = createContext<ProjectDataContextType>({
  projectData: "",
  isProjectModalVisible: false,
  setProjectData: () => {},
  setisProjectModalVisible: () => {},
});

interface ProjectDataProviderProps {
  children: React.ReactNode;
}

export function useProjectDataContext() {
  return useContext(ProjectDataContext);
}
export const ProjectDataProvider: React.FC<ProjectDataProviderProps> = ({
  children,
}: any) => {
  const [projectData, setProjectData] = useState("");
  const [isProjectModalVisible, setisProjectModalVisible] = useState(false);

  return (
    <ProjectDataContext.Provider
      value={{
        projectData,
        setProjectData,
        isProjectModalVisible,
        setisProjectModalVisible,
      }}
    >
      {children}
    </ProjectDataContext.Provider>
  );
};
