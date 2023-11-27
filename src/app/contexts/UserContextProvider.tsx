'use client'

import { createContext, useContext, useState } from "react"
import { Props } from "./common";
import { User } from "@supabase/supabase-js";
import useFetchUser from "../hooks/useFetchUser";


type UserContextType = {
  user: User | null;
  loading: boolean;
}
export const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const value = useContext(UserContext);
  if (value == null) throw Error("Cannot use outside of User Provider");

  return value;
}

export default function UserContextProvider({ children } : Props) {
  const {user, loading} = useFetchUser();
  return (
    <UserContext.Provider value={{user, loading}}>
      {children}
    </UserContext.Provider>
  )
}