import { PostRow, ImageRow } from "@/app/_schema";
import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function supaInsertPost(post: PostRow) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("posts").insert(post);
}

export async function supaInsertImages(images: ImageRow[]) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("images").insert(images);
}

export async function supaUpdateProfileImageID(
  user_id: string,
  image_id: number
) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("profiles").update({ user_id, image_id });
}

export async function supaUpdateImage(image_id: number, filename: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("images").update({ id: image_id, filename });
}

export async function supaAddImage(filename: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("images").insert({ filename }).select('id').single();
}

export async function supaGetUserProfileById(user_id: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("profiles")
    .select("username, name, image_id, images (filename)")
    .eq("user_id", user_id)
    .single();

}