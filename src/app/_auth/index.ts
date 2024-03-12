import { SupabaseClient } from "@supabase/supabase-js";
import { Profile } from "../_schema/schema";
import { R2_BUCKET_URL_PUBLIC } from "../constants";
import { DUPLICATE_USER } from "./constants";
import { queryProfileByUserID } from "./queries";
import { isExistingAccount } from "./utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../_types/supabase";


export async function fetchUserData() {
  const supabase = createClientComponentClient<Database>();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) throw new Error(sessionError.message);
  if (!sessionData || !sessionData.session) return null;
  const user = sessionData.session.user;

  const { data: profileData, error } = await queryProfileByUserID(user.id);
  if (!profileData || error) return { user };
  const fileURL =
    profileData.Images &&
    R2_BUCKET_URL_PUBLIC + "/" + profileData.Images.filename;
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
  if (error) throw new Error(error.message);
  return user;
}
