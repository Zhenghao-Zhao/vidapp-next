import { getOwnerProfile } from "@/app/_mutations";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { Profile } from "../../../_schema";
import { Database } from "../../../_types/supabase";
import { DUPLICATE_USER } from "../../constants";
import { isExistingAccount } from "../../utils";

export async function fetchUserProfile(
  setProfile: (p: Profile) => void
) {
  const { data } = await getOwnerProfile();
  if (!data) return null;
  setProfile(data.data);
  return data;
}

export async function fetchUser(setUser: (u: User) => void) {
  const supabase = createClientComponentClient<Database>();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  if (!data || !data.session) return null;
  setUser(data.session.user);
  return data.session.user;
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
