"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserProfile } from "../_auth/queries/wrappers";
import { Database } from "../_schema/supabase";
import { Profile } from "../_types";
import { Props } from "./common";

type AuthContextType = {
  profile: Profile | null | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  fetchProfile: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const value = useContext(AuthContext);
  if (value == null) throw Error("Cannot use outside of User Provider");
  return value;
}
const supabase = createClientComponentClient<Database>();
export default function AuthContextProvider({ children }: Props) {
  const queryClient = useQueryClient();
  const {
    isLoading: profileLoading,
    data: profileData,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchUserProfile(),
    staleTime: 1000 * 60 * 60 * 8,
    gcTime: 1000 * 60 * 60 * 8,
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        queryClient.setQueryData(["profile"], null);
        return;
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        profile: profileData,
        isLoading: profileLoading,
        isAuthenticated: !!profileData,
        fetchProfile: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
