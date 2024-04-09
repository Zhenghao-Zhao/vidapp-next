import { createClient } from "@/app/_utility/supabase/client";
import { Database } from "../../../_schema/supabase";

export async function signUp(
  email: string,
  password: string,
  username: string,
  name: string
) {
  const supabase = createClient();
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

  // confirm email enabled, returns a fake user
  // checks for fake user
  if (user && (user.identities === undefined || user.identities.length === 0))
    throw new Error("Duplicate user");
  return user;
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()
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
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  return error;
}

export async function verifyEmail(email: string, token: string) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (!user) throw new Error("User not found");
  if (error) throw new Error(error.message);
  return user;
}
