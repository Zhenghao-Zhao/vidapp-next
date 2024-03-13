import { DbImage } from "@/app/_schema";
import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function updateProfileImage(filename: string, imageID: number) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("Images").upsert({id: imageID, filename});
}