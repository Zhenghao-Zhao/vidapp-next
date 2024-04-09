import { Database } from "@/app/_schema/supabase";
import { createClient } from "@/app/_utility/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

export async function supaProfileByUserID(
  supabase: SupabaseClient<Database>,
  user_id: string
) {
  return supabase
    .from("profiles")
    .select("username, name, image_filename")
    .eq("user_id", user_id)
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
