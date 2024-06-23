"use client";
import { GuideSectionType } from "@/app/_libs/types";
import { createClient } from "@/app/_libs/utils/supabase/client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type DataType = {
  profile: {
    uid: string;
    username: string;
    name: string;
    imageURL: string | null;
  };
  guideData: GuideSectionType[];
};

type DataContextType = {
  data: DataType | null;
  setData: (p: DataType) => void;
};

type Props = PropsWithChildren<{ data: DataType }>;

export const DataContext = createContext<DataContextType | null>(null);
const supabase = createClient();

export function useDataContext() {
  const value = useContext(DataContext);
  if (value == null) throw Error("Cannot use outside of Provider");
  return value;
}
export default function DataContextProvider({
  data: serverData,
  children,
}: Props) {
  const [data, setData] = useState<DataType>(serverData);

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
