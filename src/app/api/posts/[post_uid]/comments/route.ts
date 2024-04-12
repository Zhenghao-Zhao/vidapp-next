import { createClient } from "@/app/_utility/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { supaGetComments } from "../../_queries";
import { Comment } from "@/app/_types";
import { ENV } from "@/app/env";

export async function GET(
  request: NextRequest,
  { params }: { params: { post_uid: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const page = request.nextUrl.searchParams.get("page");
  if (!page)
    return NextResponse.json(
      { message: "Missing page number" },
      { status: 400 }
    );

  const LIMIT = 20;

  const from = parseInt(page) * LIMIT;
  const to = from + LIMIT - 1;

  const post_uid = params.post_uid;
  const { data, error } = await supaGetComments(supabase, post_uid, user.id, from, to);

  if (error)
    return NextResponse.json({ message: error.message }, { status: 404 });

  const comments: Comment[] = data.map((comment) => ({
    uid: comment.ret_comment_uid,
    created_at: comment.ret_created_at,
    comment: comment.ret_comment,
    from_user: {
      uid: comment.ret_profile_uid,
      username: comment.ret_username,
      name: comment.ret_name,
      imageURL: comment.ret_profile_image && ENV.R2_BUCKET_URL_PUBLIC + "/" + comment.ret_profile_image,
    }
  }))

  const nextCursor = data.length < LIMIT ? null : parseInt(page) + 1;
  return NextResponse.json({ comments, nextCursor }, { status: 200 });
}
