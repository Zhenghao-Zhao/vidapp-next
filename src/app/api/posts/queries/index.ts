import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function queryPaginatedPostsForUser(
  from: number,
  limit: number,
  userID: string
  ) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("Posts")
    .select("description, likes_count, Images (filename)")
    .eq("creator_id", userID)
    .range(from, from + limit - 1);
}
