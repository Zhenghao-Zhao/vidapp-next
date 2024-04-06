import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function supaAddFollow(owner_uid: string, follower_uid: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from('followers').insert({owner_uid, follower_uid})
}

export async function supaRemoveFollow(owner_uid: string, follower_uid: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from('followers').delete().match({owner_uid, follower_uid})
}