import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { supaGetFollowersFunction } from "./_queries";
import { ENV } from "@/app/env";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const supabase = createRouteSupabaseClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const uid = params.uid;
  const { data, error } = await supaGetFollowersFunction(uid);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  const rtn = data.map((userInfo) => {
    return {
      username: userInfo.ret_username,
      name: userInfo.ret_name,
      imageURL: userInfo.ret_profile_image && ENV.R2_BUCKET_URL_PUBLIC + "/" + userInfo.ret_profile_image
    }
  })
  return NextResponse.json(rtn, {status: 200})
}
