import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export function supaGetFollowers(uid: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("followers")
    .select("profiles (*)")
    .eq("owner_uid", uid);
}
