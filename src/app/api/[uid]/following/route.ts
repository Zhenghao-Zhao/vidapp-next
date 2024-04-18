import { ENV } from "@/app/env";
import { NextRequest, NextResponse } from "next/server";
import { supaGetFollowingFunction } from "./_queries";
import { createClient } from "@/app/_utility/supabase/server";
import { getUserFollowing } from "@/app/_server/utils/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const uid = params.uid;
  const page = request.nextUrl.searchParams.get("page");
  if (!page)
    return NextResponse.json(
      { message: "Missing page number" },
      { status: 400 }
    );

  const LIMIT = 10;
  // index of start row in db
  const from = parseInt(page) * LIMIT;
  const data = await getUserFollowing(supabase, uid, from, LIMIT);

  return NextResponse.json(data, { status: 200 });
}
