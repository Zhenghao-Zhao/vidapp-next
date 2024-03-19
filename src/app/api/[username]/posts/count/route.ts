import { NextRequest, NextResponse } from "next/server";
import { supaGetPostCount } from "../_queries";

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  const { count, error } = await supaGetPostCount(params.username)
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
  return NextResponse.json({ count }, { status: 200 })
}