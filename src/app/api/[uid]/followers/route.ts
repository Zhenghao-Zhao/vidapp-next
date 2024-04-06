import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { supaGetFollowers } from "./_queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const supabase = createRouteSupabaseClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const uid = params.uid;
  const { data, error } = await supaGetFollowers(uid);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(data, {status: 200})

}
