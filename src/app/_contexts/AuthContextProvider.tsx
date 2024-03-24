"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchUser, fetchUserProfile } from "../_auth/queries/wrappers";
import { Database } from "../_schema/supabase";
import { Profile } from "../_types";
import { Props } from "./common";

type AuthContextType = {
  user: User | null | undefined;
  profile: Profile | null | undefined;
  isLoading: boolean;
  setUser: (u: User | null) => void;
  setProfile: (p: Profile | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const value = useContext(AuthContext);
  if (value == null) throw Error("Cannot use outside of User Provider");
  return value;
}
const supabase = createClientComponentClient<Database>();
export default function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const { isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(setUser),
    staleTime: 1000 * 60 * 60 * 8,
  });

  const { isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchUserProfile(user?.user_metadata.username, setProfile),
    enabled: !!user,
    staleTime: 1000 * 60 * 60 * 8,
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) return setUser(null);
      setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        profile: profile,
        isLoading: userLoading || profileLoading,
        setUser,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
