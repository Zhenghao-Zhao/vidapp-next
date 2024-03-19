import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { ENV } from "@/app/env";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { uploadCloudImage } from "../../_utils";
import {
  supaAddImage,
  supaGetUserProfileById,
  supaUpdateImage,
  supaUpdateProfileImageID,
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
    data.images && ENV.R2_BUCKET_URL_PUBLIC + "/" + data.images.filename;
  const profile = {
    username: data.username,
    name: data.name,
    imageURL,
    image_id: data.image_id,
  };
  return NextResponse.json({ data: profile }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const supabase = createRouteSupabaseClient();
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const image_id = formData.get("image_id") as string;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const rtn: any = {}
  // if image file is uploaded
  if (file) {
    const filename = randomUUID();
    const res = await uploadCloudImage(filename, file);
    if (!res.ok)
      return NextResponse.json(
        { message: "upload image to cloud failed" },
        { status: 500 }
      );
    // if user has a profile image and wants to replace it
    if (image_id) {
      const { error } = await supaUpdateImage(parseInt(image_id), filename);
      if (error)
        return NextResponse.json(
          { message: "update image at db failed: " + error.message },
          { status: 500 }
        );
    } else {
      // if user does not have a p image, add new entry to image table then add reference to profile
      const { data, error } = await supaAddImage(filename);
      if (!data || error)
        return NextResponse.json(
          { message: "add image at db failed: " + error.message },
          { status: 500 }
        );
      const { error: pError } = await supaUpdateProfileImageID(
        user.id,
        data.id
      );
      if (pError)
        return NextResponse.json(
          { message: "update profile image id failed: " + pError.message },
          { status: 500 }
        );
      rtn.image_id = data.id;
    }
    rtn.imageURL = ENV.R2_BUCKET_URL_PUBLIC + "/" + filename;
  }

  return NextResponse.json({ profile: rtn }, { status: 200 });
}
