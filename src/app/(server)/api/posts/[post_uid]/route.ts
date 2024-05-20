import { getPost } from "@/app/(server)/_server/utils/queries";
import { createClient } from "@/app/_libs/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { supaDeletePost } from "../_queries";

export async function DELETE(
  request: NextRequest,
  { params: { post_uid } }: { params: { post_uid: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { error } = await supaDeletePost(supabase, post_uid);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Successful" }, { status: 200 });
}

export async function GET(
  request: NextRequest,
  { params: { post_uid } }: { params: { post_uid: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { data, error } = await getPost(supabase, post_uid, user.id);
  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}
