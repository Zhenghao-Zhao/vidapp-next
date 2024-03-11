"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Props } from "./common";
import { AuthError, User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Profile } from "../_schema/schema";
import { useQuery } from "@tanstack/react-query";
import { fetchSession, fetchProfileByUserID } from "../_auth/queries";

type AuthContextType = {
  user: User | null | undefined;
  profile: Profile | null | undefined;
  refetch: () => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const value = useContext(AuthContext);
  if (value == null) throw Error("Cannot use outside of User Provider");
  return value;
}

export default function AuthContextProvider({ children }: Props) {
  const client = createClientComponentClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["session"],
    queryFn: () => fetchSession(client),
  });

  return (
    <AuthContext.Provider
      value={{
        user: data?.user,
        profile: data?.profile,
        refetch,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
