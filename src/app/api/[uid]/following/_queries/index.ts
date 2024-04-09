import { Database } from "@/app/_schema/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function supaGetFollowingFunction(supabase: SupabaseClient<Database>, uid: string) {
  return supabase.rpc("get_user_following", { arg_uid: uid });
}