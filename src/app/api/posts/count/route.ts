import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createRouteSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ message: "Cannot find user" }, { status: 500 });

  const { count, error } = await supabase
    .from("Posts")
    .select('*', { count: 'exact', head: true })
    .eq('creator_id', user.id)

  if (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 })
  }

  return NextResponse.json({ count }, { status: 200 })
}