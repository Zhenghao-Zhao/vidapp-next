import { Database } from "@/app/_libs/schema/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function supaAddFollow(supabase: SupabaseClient<Database>, followee_uid: string, follower_uid: string) {
  return supabase.from('friends').insert({followee_uid, follower_uid})
}

export async function supaRemoveFollow(supabase: SupabaseClient<Database>, followee_uid: string, follower_uid: string) {
  return supabase.from('friends').delete().match({followee_uid, follower_uid})
}