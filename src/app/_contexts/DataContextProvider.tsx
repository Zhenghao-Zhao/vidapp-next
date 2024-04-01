"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type DataType = {
  username: string;
  name: string;
  imageURL: string;
};

type DataContextType = {
  data: DataType | null;
  setData: (p: DataType) => void;
};

export const DataContext = createContext<DataContextType | null>(null);

export function useDataContext() {
  const value = useContext(DataContext);
  if (value == null) throw Error("Cannot use outside of Data Provider");
  return value;
}
export default function DataContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<DataType | null>(null);
  useEffect(() => {
    const allData = document.getElementById("data");
    if (!allData || !allData.textContent) return;
    setData(JSON.parse(allData.textContent));
  }, []);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
