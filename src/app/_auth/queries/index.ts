import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/_types/supabase";

export async function queryProfileByUserID(userID: string) {
  const supabase = createClientComponentClient<Database>();
  return supabase
    .from("Profiles")
    .select("username, Images (filename)")
    .eq("user_id", userID)
    .single();
}

