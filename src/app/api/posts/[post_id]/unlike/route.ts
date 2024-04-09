import { createClient } from "@/app/_utility/supabase/server";
import { STATUS_MESSAGES } from "@/app/api/_utils";
import { NextRequest, NextResponse } from "next/server";
import { supaRemoveLikeToPost } from "../../_queries";

export async function POST(
  request: NextRequest,
  { params }: { params: { post_id: string } }
) {
  const post_id = params.post_id;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const uid = user.id;
  const { error } = await supaRemoveLikeToPost(supabase, post_id, uid);
  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json(
    { message: STATUS_MESSAGES.get(200) },
    { status: 200 }
  );
}
