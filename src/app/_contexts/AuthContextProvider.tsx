"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Props } from "./common";
import { AuthError, User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<Error | null>;
  signIn: (email: string, password: string) => Promise<Error | null>;
  signOut: () => Promise<AuthError | null>;
  verifyEmail: (email: string, token: string) => Promise<Error | null>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const isExistingAccount = (user: User) => {
  return user.identities === undefined || user.identities.length === 0;
};

enum SignUpErrors {
  DUPLICATE_USER = "Please use a different email to continue",
}

export function useAuthContext() {
  const value = useContext(AuthContext);
  if (value == null) throw Error("Cannot use outside of User Provider");
  return value;
}

export default function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    const supabase = createClientComponentClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(user);
    return error;
  };

  const signUp = async (email: string, password: string) => {
    const supabase = createClientComponentClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (user && isExistingAccount(user))
      return new Error(SignUpErrors.DUPLICATE_USER);
    return error;
  };

  const signOut = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();
    setUser(null);
    return error;
  };

  const verifyEmail = async (email: string, token: string) => {
    const supabase = createClientComponentClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.verifyOtp({ email, token, type: "email" });
    setUser(user);
    return error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
