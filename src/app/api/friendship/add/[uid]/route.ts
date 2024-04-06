import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { supaAddFollow } from "../../_queries";

export async function POST(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const supabase = createRouteSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const uid = params.uid;
  const { error } = await supaAddFollow(uid, user.id);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Successful" }, { status: 200 });
}
