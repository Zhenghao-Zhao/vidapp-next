import { uploadCloudImage } from "@/app/api/_utils";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { updateProfileImage } from "../_queries";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const profileImageID = formData.get("profile_image_id") as string;
  if (!file) {
    return NextResponse.json(
      { message: "Missing upload file" },
      { status: 500 }
    );
  }

  if (!profileImageID) {
    return NextResponse.json({ message: "Missing image id" }, { status: 500 });
  }

  const filename = randomUUID();
  const res = await uploadCloudImage(filename, file);
  if (!res.ok) return NextResponse.json({ message: "Failed" }, { status: 500 });
  const { error: updateError } = await updateProfileImage(
    filename,
    parseInt(profileImageID)
  );
  if (updateError) {
    return NextResponse.json({ message: updateError.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Successful" }, { status: 200 });
}
