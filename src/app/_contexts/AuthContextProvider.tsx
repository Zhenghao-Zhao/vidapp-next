"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Props } from "./common";
import { User } from "@supabase/supabase-js";
import { Profile } from "../_schema";
import { useQuery } from "@tanstack/react-query";
import { fetchUser, fetchUserProfile } from "../_auth/queries/wrappers";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../_types/supabase";

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
    queryKey: ["session"],
    queryFn: () => fetchUser(setUser),
  });

  const { isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchUserProfile(setProfile),
    enabled: !!user,
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
