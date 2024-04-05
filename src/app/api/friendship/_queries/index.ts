import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function supaAddFollow(owner_username: string, follower_username: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from('followers').insert({owner_username, follower_username})
}

export async function supaRemoveFollow(owner_username: string, follower_username: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from('followers').delete().match({owner_username, follower_username})
}