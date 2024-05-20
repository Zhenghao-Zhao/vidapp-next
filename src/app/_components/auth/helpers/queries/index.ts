import { Database } from "@/app/_libs/schema/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function supaProfileByUserID(
  supabase: SupabaseClient<Database>,
  uid: string
) {
  return supabase
    .from("profiles")
    .select("username, name, image_filename")
    .eq("uid", uid)
    .single();
}

export async function supaProfileByUsername(
  supabase: SupabaseClient<Database>,
  username: string
) {
  return supabase
    .from("profiles")
    .select("username, name, image_filename")
    .eq("username", username)
    .single();
}
