import { ImageRow, PostRow } from "@/app/_schema";
import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function supaGetPostCount(username: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("username", username);
}

export async function supaUpdateImage(image_id: number, filename: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("images").update({ id: image_id, filename });
}

export async function supaAddImage(filename: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("images").insert({ filename }).select('id').single();
}

export async function supaUpdateProfileImageID(
  username: string,
  image_id: number
) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("profiles").update({ username, image_id });
}

export async function supaGetPaginatedPosts(username: string, from: number, to: number) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("posts")
    .select("description, likes_count, images (filename)")
    .eq("username", username)
    .range(from, to);
}

export async function supaInsertPost(post: PostRow) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("posts").insert(post);
}

export async function supaInsertImages(images: ImageRow[]) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("images").insert(images);
}