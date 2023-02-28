import { createContext, useContext, useState } from "react";

interface ModalDimContextType {
  isModalDimmed: boolean;
  setIsModalDimmed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalDimContext = createContext<ModalDimContextType>({
  isModalDimmed: false,
  setIsModalDimmed: () => {},
});

interface DimProviderProps {
  children: React.ReactNode;
}

export function useModalDimContext() {
  return useContext(ModalDimContext);
}
export const ModalDimProvider: React.FC<DimProviderProps> = ({
  children,
}: any) => {
  const [isModalDimmed, setIsModalDimmed] = useState(false);

  return (
    <ModalDimContext.Provider value={{ isModalDimmed, setIsModalDimmed }}>
      {children}
    </ModalDimContext.Provider>
  );
};
