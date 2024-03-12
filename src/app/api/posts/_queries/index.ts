import { ImageRow, PostRow } from "@/app/_schema/schema";
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

export async function insertPost(post: PostRow) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("Posts").insert(post);
}

export async function insertImages(images: ImageRow[]) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("Images").insert(images);
}

export async function queryPostCountForUser(userID: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("Posts")
    .select("*", { count: "exact", head: true })
    .eq("creator_id", userID);
}
