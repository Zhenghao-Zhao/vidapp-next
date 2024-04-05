import { Profile } from "@/app/_types";
import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { ENV } from "@/app/env";
import { NextRequest, NextResponse } from "next/server";
import { supaGetUserProfileWithFunction } from "../posts/_queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const supabase = createRouteSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const username = params.username;
  const { data, error } = await supaGetUserProfileWithFunction(
    username,
    user.user_metadata.username
  );
  if (error) {
    console.log(error);
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  console.log(data);
  const imageURL =
    data.image_filename && ENV.R2_BUCKET_URL_PUBLIC + "/" + data.image_filename;
  const profile: Profile = {
    username: data.username as string,
    name: data.name as string,
    imageURL: imageURL as string,
    post_count: data.post_count as number,
    follower_count: data.follower_count as number,
    has_followed: data.has_followed as boolean,
  };

  return NextResponse.json(profile, { status: 200 });
}
