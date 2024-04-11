import { Database } from "@/app/_schema/supabase";
import { ImageRow, PostRow } from "@/app/_types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function supaInsertPost(supabase: SupabaseClient<Database>, post: PostRow) {
  return supabase.from("posts").insert(post);
}

export async function supaInsertImages(supabase: SupabaseClient<Database>, images: ImageRow[]) {
  return supabase.from("images").insert(images);
}

export async function supaUpdateProfileImage(
  supabase: SupabaseClient<Database>,
  uid: string,
  filename: string,
) {
  return supabase.from("profiles").update({ image_filename: filename }).eq('uid', uid);
}

export async function supaAddImage(supabase: SupabaseClient<Database>, filename: string) {
  return supabase.from("images").insert({ filename }).select('id').single();
}

export async function supaGetUserProfileById(supabase: SupabaseClient<Database>, uid: string) {
  return supabase
    .from("profiles")
    .select("username, name, image_filename")
    .eq("uid", uid)
    .single();
}