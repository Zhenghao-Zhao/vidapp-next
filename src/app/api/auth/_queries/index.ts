import { ImageRow, PostRow } from "@/app/_schema";
import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function supaInsertPost(post: PostRow) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("posts").insert(post);
}

export async function supaInsertImages(images: ImageRow[]) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("images").insert(images);
}

export async function supaUpdateProfileImage(
  user_id: string,
  filename: string,
) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("profiles").update({ image_filename: filename }).eq('user_id', user_id);
}

export async function supaAddImage(filename: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("images").insert({ filename }).select('id').single();
}

export async function supaGetUserProfileById(user_id: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("profiles")
    .select("username, name, image_filename")
    .eq("user_id", user_id)
    .single();
}