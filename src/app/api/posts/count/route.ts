import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { NextResponse } from "next/server";
import { queryPostCountForUser } from "../_queries";

export async function GET() {
  const supabase = createRouteSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ message: "Cannot find user" }, { status: 500 });

  const { count, error } = await queryPostCountForUser(user.id)

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
  return NextResponse.json({ count }, { status: 200 })
}