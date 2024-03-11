import { SupabaseClient } from "@supabase/supabase-js";
import { isExistingAccount } from "./utils";
import { DUPLICATE_USER } from "./constants";
import { Profile } from "../_schema/schema";

export async function fetchProfileByUserID(
  supabase: SupabaseClient,
  userID: string
) {
  const { data, error } = await supabase
    .from("Profiles")
    .select("*")
    .eq("user_id", userID)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function fetchSession(supabase: SupabaseClient) {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) throw new Error(sessionError.message);

  if (!sessionData || !sessionData.session) return null;
  const user = sessionData.session.user;
  const profileData = await fetchProfileByUserID(supabase, user.id);
  const profile: Profile = {
    username: profileData.username,
    profileImage: profileData.profile_image_filename,
  }
  return { user, profile };
}

export async function signUp(
  supabase: SupabaseClient,
  email: string,
  password: string,
  username: string
) {
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) throw new Error(error.message);

  if (user && isExistingAccount(user)) throw new Error(DUPLICATE_USER);
  return user;
}

export async function signIn(
  supabase: SupabaseClient,
  email: string,
  password: string
) {
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

export async function signOut(supabase: SupabaseClient) {
  const { error } = await supabase.auth.signOut();
  return error;
}

export async function verifyEmail(
  supabase: SupabaseClient,
  email: string,
  token: string
) {
  const {
    data: { user },
    error,
  } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error) throw new Error(error.message);
  return user;
}
