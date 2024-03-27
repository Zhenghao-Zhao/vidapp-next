import { ENV } from "@/app/env";
import { NextRequest, NextResponse } from "next/server";
import { supaGetUserProfileByUsername } from "../posts/_queries";
import { Profile } from "@/app/_types";
import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const supabase = createRouteSupabaseClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (!userData || userError) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const username = params.username;
  const { data, error } = await supaGetUserProfileByUsername(username);
  if (!data || error)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const imageURL =
    data.image_filename && ENV.R2_BUCKET_URL_PUBLIC + "/" + data.image_filename;
  const profile: Profile = {
    username: data.username,
    name: data.name,
    imageURL,
    image_filename: data.image_filename,
    post_count: data.posts.length,
  };
  return NextResponse.json(profile, { status: 200 });
}
