import { NextRequest, NextResponse } from "next/server";
import { supaGetUserProfileByUsername } from "../posts/_queries";
import { ENV } from "@/app/env";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const { data, error } = await supaGetUserProfileByUsername(username);
  if (!data || error)
    return NextResponse.json({ message: "User not found" }, { status: 400 });

  const imageURL =
    data.images && ENV.R2_BUCKET_URL_PUBLIC + "/" + data.images.filename;
  const profile = {
    username: data.username,
    name: data.name,
    imageURL,
    image_id: data.image_id,
  };
  return NextResponse.json({ data: profile }, { status: 200 });
}
