import { Database } from "@/app/_libs/schema/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function supaAddFollow(supabase: SupabaseClient<Database>, owner_uid: string, follower_uid: string) {
  return supabase.from('followers').insert({owner_uid, follower_uid})
}

export async function supaRemoveFollow(supabase: SupabaseClient<Database>, owner_uid: string, follower_uid: string) {
  return supabase.from('followers').delete().match({owner_uid, follower_uid})
}