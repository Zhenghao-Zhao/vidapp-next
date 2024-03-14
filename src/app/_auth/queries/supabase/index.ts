import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/_types/supabase";

export async function queryProfileByUserID(user_id: string) {
  const supabase = createClientComponentClient<Database>();
  return supabase
    .from("profiles")
    .select("username, image_id, images (filename)")
    .eq("user_id", user_id)
    .single();
}

export async function queryProfileByUsername(username: string) {
  const supabase = createClientComponentClient<Database>();
  return supabase
    .from("profiles")
    .select("username, image_id, images (filename)")
    .eq("username", username)
    .single();
}
