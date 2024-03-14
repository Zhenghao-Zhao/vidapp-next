import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { uploadCloudImage } from "../../_utils";
import {
  supaAddImage,
  supaUpdateImage,
  supaUpdateProfileImageID,
} from "../posts/_queries/supabase";

export async function POST(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const formData = await request.formData();
  const file = formData.get("imageFile") as File;
  const image_id = formData.get("image_id") as string;

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
          { message: "update image at db failed" },
          { status: 500 }
        );
    } else {
      // if user does not have a p image, add new entry to image table then add reference to profile
      const { data, error } = await supaAddImage(filename);
      if (!data || error)
        return NextResponse.json(
          { message: "add image at db failed" },
          { status: 500 }
        );
      const { error: pError } = await supaUpdateProfileImageID(
        username,
        data.id
      );
      if (pError)
        return NextResponse.json(
          { message: "update profile image id failed" },
          { status: 500 }
        );
    }
  }

  return NextResponse.json({ message: "Update successful" }, { status: 200 });
}
