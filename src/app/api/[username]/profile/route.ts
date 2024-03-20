import { ENV } from "@/app/env";
import { NextRequest, NextResponse } from "next/server";
import { supaGetUserProfileByUsername } from "../posts/_queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const { data, error } = await supaGetUserProfileByUsername(username);
  if (!data || error)
    return NextResponse.json({ message: "User not found" }, { status: 400 });

  const imageURL =
    data.image_filename && ENV.R2_BUCKET_URL_PUBLIC + "/" + data.image_filename;
  const profile = {
    username: data.username,
    name: data.name,
    imageURL,
    image_filename: data.image_filename
  };
  return NextResponse.json({ data: profile }, { status: 200 });
}
