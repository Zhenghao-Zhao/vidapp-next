import { Profile } from "@/app/_types";
import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { getImageURLFromFilename } from "../../_utils";
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

  const username = params.uid;
  const { data, error } = await supaGetUserProfileWithFunction(
    supabase,
    username,
    user.id
  );
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
  const imageURL = getImageURLFromFilename(data.ret_profile_image);
  const profile: Profile = {
    uid: data.ret_uid,
    username: data.ret_username,
    name: data.ret_name,
    imageURL: imageURL,
    post_count: data.ret_post_count,
    follower_count: data.ret_follower_count,
    following_count: data.ret_following_count,
    has_followed: data.ret_has_followed,
  };

  return NextResponse.json(profile, { status: 200 });
}
