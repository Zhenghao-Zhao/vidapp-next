import { createClient } from "@/app/_utility/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { getImageURLFromFilename } from "../../_utils";
import { supaGetPaginatedFollowersFunction } from "./_queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const page = request.nextUrl.searchParams.get("page");
  if (!page)
    return NextResponse.json(
      { message: "Invalid request URL" },
      { status: 500 }
    );
  const LIMIT = 10;
  const from = parseInt(page) * LIMIT;
  const uid = params.uid;
  const { data, error } = await supaGetPaginatedFollowersFunction(
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
      imageURL: getImageURLFromFilename(userInfo.ret_profile_image),
    };
  });
  return NextResponse.json(rtn, { status: 200 });
}
