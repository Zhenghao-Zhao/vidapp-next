import { createClient } from "@/app/_libs/_utils/supabase/server";
import { getFollowingPosts } from "@/app/api/_server/utils/queries";
import { NextRequest, NextResponse } from "next/server";
import { Pagination } from "../_utils/constants";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const page = request.nextUrl.searchParams.get("page");
  const from_uid = user.id;
  if (!page) {
    return NextResponse.json(
      { message: "Bad request, missing page number" },
      { status: 400 }
    );
  }

  const { data, error } = await getFollowingPosts(
    supabase,
    from_uid,
    parseInt(page),
    Pagination.LIMIT_POSTS
  );
  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data, { status: 200 });
}
