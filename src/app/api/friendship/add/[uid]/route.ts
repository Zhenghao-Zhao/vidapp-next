import { createClient } from "@/app/_libs/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { supaAddFollow } from "../../_queries";

export async function POST(
  request: NextRequest,
  { params: {uid} }: { params: { uid: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { error } = await supaAddFollow(supabase, uid, user.id);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json({ has_followed: true }, { status: 200 });
}
