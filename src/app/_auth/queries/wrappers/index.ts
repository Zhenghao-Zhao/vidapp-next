import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { Database } from "../../../_schema/supabase";
import { Profile } from "../../../_types";
import { DUPLICATE_USER } from "../../constants";
import { isExistingAccount } from "../../utils";
import { getUserProfile } from "@/app/_queries";

export async function fetchUserProfile(
  username: string,
  setProfile: (p: Profile) => void
) {
  const { data } = await getUserProfile(username);
  if (!data) return null;
  setProfile(data);
  return data;
}

export async function fetchUser(setUser: (u: User) => void) {
  const supabase = createClientComponentClient<Database>();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  if (!data) return null;
  setUser(data.user);
  return data.user;
}

export async function signUp(
  email: string,
  password: string,
  username: string,
  name: string
) {
  const supabase = createClientComponentClient<Database>();
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        name,
      },
    },
  });

  if (error) throw new Error(error.message);

  if (user && isExistingAccount(user)) throw new Error(DUPLICATE_USER);
  return user;
}

export async function signIn(email: string, password: string) {
  const supabase = createClientComponentClient<Database>();
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  if (!user) throw new Error("user not found");
  return user;
}

export async function signOut() {
  const supabase = createClientComponentClient<Database>();
  const { error } = await supabase.auth.signOut();
  return error;
}

export async function verifyEmail(email: string, token: string) {
  const supabase = createClientComponentClient<Database>();
  const {
    data: { user },
    error,
  } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (!user) throw new Error("User not found");
  if (error) throw new Error(error.message);
  return user;
}
