import { Profile } from "@/app/_types";
import { createClient } from "@/app/_utility/supabase/server";
import { ENV } from "@/app/env";
import { NextRequest, NextResponse } from "next/server";
import { supaGetUserProfileWithFunction } from "../posts/_queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const uid = params.uid;
  const { data, error } = await supaGetUserProfileWithFunction(
    supabase,
    uid,
    user.id
  );
  if (error) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const imageURL =
    data.ret_profile_image && ENV.R2_BUCKET_URL_PUBLIC + "/" + data.ret_profile_image;
  const profile: Profile = {
    username: data.ret_username,
    name: data.ret_name,
    imageURL: imageURL,
    post_count: data.ret_post_count,
    follower_count: data.ret_follower_count,
    has_followed: data.ret_has_followed,
  };

  return NextResponse.json(profile, { status: 200 });
}
