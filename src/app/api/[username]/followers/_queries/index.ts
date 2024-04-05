import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export function supaGetFollowers(username: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("followers")
    .select("profiles (*)")
    .eq("owner_username", username);
}
