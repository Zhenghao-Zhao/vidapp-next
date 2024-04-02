import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { supaAddLikeToPost, supaIncrementLikesCount } from "../../_queries";
import { STATUS_MESSAGES } from "@/app/api/_utils";

export async function POST(
  request: NextRequest,
  { params }: { params: { post_id: string } }
) {
  const supabase = createRouteSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const post_id = params.post_id;
  const username = user.user_metadata.username;
  const { error } = await supaAddLikeToPost(post_id, username);
  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });

  const { error: increError } = await supaIncrementLikesCount(post_id);
  if (increError)
    return NextResponse.json({ message: increError.message }, { status: 500 });
  return NextResponse.json(
    { message: STATUS_MESSAGES.get(200) },
    { status: 200 }
  );
}
