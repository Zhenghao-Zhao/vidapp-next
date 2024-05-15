import { getUserFollowing } from "@/app/_server/utils/queries";
import { Friend } from "@/app/_types";
import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { getImageURLFromFilename } from "../../_utils";
import { Pagination } from "../../_utils/constants";
import { supaQueryFollowing } from "./_queries";

export async function GET(
  request: NextRequest,
  { params: { uid } }: { params: { uid: string } }
) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const page = request.nextUrl.searchParams.get("page");

  if (page) {
    // index of start row in db
    const { data, error } = await getUserFollowing(
      supabase,
      uid,
      parseInt(page),
      Pagination.LIMIT_FOLLOWING
    );
    if (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  }

  const query = request.nextUrl.searchParams.get("query");
  if (query) {
    const { data, error } = await supaQueryFollowing(supabase, uid, query);
    if (error) {
      console.log(error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    const followings: Friend[] = data.map((ret, i) => {
      return {
        uid: ret.ret_uid,
        username: ret.ret_username,
        name: ret.ret_name,
        imageURL: getImageURLFromFilename(ret.ret_profile_image),
        has_followed: true,
      };
    });
    return NextResponse.json(followings, { status: 200 });
  }
  return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
}
