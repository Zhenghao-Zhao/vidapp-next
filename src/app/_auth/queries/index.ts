import { QueryData, SupabaseClient } from "@supabase/supabase-js";
import { isExistingAccount } from "../utils";
import { DUPLICATE_USER } from "../constants";
import { Profile } from "../../_schema/schema";
import { R2_BUCKET_URL_PUBLIC } from "../../constants";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/_types/supabase";

const supabase = createClientComponentClient<Database>();

export async function queryProfileByUserID(
  userID: string
) {
  return supabase
    .from("Profiles")
    .select("username, Images (filename)")
    .eq("user_id", userID)
    .single();
}

export async function fetchUserData() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) throw new Error(sessionError.message);
  if (!sessionData || !sessionData.session) return null;
  const user = sessionData.session.user;

  const profileQuery = queryProfileByUserID(user.id);
  type ProfileData = QueryData<typeof profileQuery>;

  const { data, error } = await profileQuery;
  if (!data || error) return null;
  const profileData: ProfileData = data;
  const fileURL = profileData.Images && R2_BUCKET_URL_PUBLIC + "/" + profileData.Images.filename;

  const profile: Profile = {
    username: profileData.username,
    profileImage: fileURL,
  };
  return { user, profile };
}

export async function signUp(
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
