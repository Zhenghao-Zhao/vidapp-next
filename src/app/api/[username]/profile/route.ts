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
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (!userData || userError) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const username = params.username;
  const {data, error} = await supaGetUserProfileWithFunction(username);
  if (error)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const imageURL =
    data.image_filename && ENV.R2_BUCKET_URL_PUBLIC + "/" + data.image_filename;
  const profile: Profile = {
    username: data.username as string,
    name: data.name as string,
    imageURL: imageURL as string,
    post_count: data.post_count as number,
    follower_count: data.follower_count as number,
  };

  return NextResponse.json(profile, { status: 200 });
}
