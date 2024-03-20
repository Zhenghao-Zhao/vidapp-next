import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { ENV } from "@/app/env";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { deleteCloudImage, uploadCloudImage } from "../../_utils";
import {
  supaGetUserProfileById,
  supaUpdateProfileImage,
} from "../_queries";

export async function GET(request: NextRequest) {
  const supabase = createRouteSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { data } = await supaGetUserProfileById(user.id);
  if (!data)
    return NextResponse.json({ message: "Profile not found" }, { status: 500 });

  const imageURL =
    data.image_filename && ENV.R2_BUCKET_URL_PUBLIC + "/" + data.image_filename;
  const profile = {
    username: data.username,
    name: data.name,
    image_filename: data.image_filename,
    imageURL,
  };
  return NextResponse.json({ data: profile }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const supabase = createRouteSupabaseClient();
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const rtn: any = {};
  // if image file is uploaded
  if (file) {
    const filename = randomUUID();
    const res = await uploadCloudImage(filename, file);
    if (!res.ok)
      return NextResponse.json(
        { message: "upload image to cloud failed" },
        { status: 500 }
      );
    const { error: pError } = await supaUpdateProfileImage(user.id, filename);
    if (pError)
      return NextResponse.json(
        { message: "update profile image id failed: " + pError.message },
        { status: 500 }
      );
    rtn.imageURL = ENV.R2_BUCKET_URL_PUBLIC + "/" + filename;
  }

  return NextResponse.json({ profile: rtn }, { status: 200 });
}
