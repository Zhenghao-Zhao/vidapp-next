"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Database } from "../../_schema/supabase";
import { GuideSectionType } from "@/app/_types";

export type DataType = {
  user_id: string;
  username: string;
  name: string;
  imageURL: string;
  guideData: GuideSectionType[],
  chips: string[],
};

type DataContextType = {
  data: DataType | null;
  setData: (p: DataType) => void;
};

export const DataContext = createContext<DataContextType | null>(null);
const supabase = createClientComponentClient<Database>();

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
