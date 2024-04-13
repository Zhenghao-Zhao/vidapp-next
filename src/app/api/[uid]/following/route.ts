import { ENV } from "@/app/env";
import { NextRequest, NextResponse } from "next/server";
import { supaGetFollowingFunction } from "./_queries";
import { createClient } from "@/app/_utility/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const uid = params.uid;
  const page = request.nextUrl.searchParams.get("page");
  if (!page)
    return NextResponse.json(
      { message: "Missing page number" },
      { status: 400 }
    );

  const LIMIT = 10;
  // index of start row in db
  const from = parseInt(page) * LIMIT;
  const { data, error } = await supaGetFollowingFunction(
    supabase,
    uid,
    from,
    LIMIT
  );
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  const rtn = data.map((userInfo) => {
    return {
      username: userInfo.ret_username,
      name: userInfo.ret_name,
      imageURL:
        userInfo.ret_profile_image &&
        ENV.R2_BUCKET_URL_PUBLIC + "/" + userInfo.ret_profile_image,
    };
  });
  return NextResponse.json(rtn, { status: 200 });
}
