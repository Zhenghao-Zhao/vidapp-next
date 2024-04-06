import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { supaDeletePost } from "../_queries";

export async function DELETE(
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
  const uid = user.id;
  const { error } = await supaDeletePost(post_id, uid);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Successful" }, { status: 200 });
}
