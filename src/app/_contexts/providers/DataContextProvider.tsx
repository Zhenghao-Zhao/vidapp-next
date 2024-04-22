"use client";
import { Friend, GuideSectionType } from "@/app/_types";
import { createClient } from "@/app/_utility/supabase/client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type DataType = {
  profile: {
    uid: string,
    username: string,
    name: string,
    imageURL: string,
  };
  guideData: GuideSectionType[],
  chips: string[],
  following: Friend[] | undefined,
};

type DataContextType = {
  data: DataType | null;
  setData: (p: DataType) => void;
};

export const DataContext = createContext<DataContextType | null>(null);
const supabase = createClient()

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

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && data) {
        window.location.reload();
        return;
      }
    });
    return () => subscription.unsubscribe();
  }, [data]);
  
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
