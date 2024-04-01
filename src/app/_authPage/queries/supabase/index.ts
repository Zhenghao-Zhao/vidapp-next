import { Database } from "@/app/_schema/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function supaProfileByUserID(user_id: string) {
  const supabase = createClientComponentClient<Database>();
  return supabase
    .from("profiles")
    .select("username, name, image_filename")
    .eq("user_id", user_id)
    .single();
}

export async function supaProfileByUsername(username: string) {
  const supabase = createClientComponentClient<Database>();
  return supabase
    .from("profiles")
    .select("username, name, image_filename")
    .eq("username", username)
    .single();
}
