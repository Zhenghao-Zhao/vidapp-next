import { createClient } from "@/app/_libs/utils/supabase/server";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getImageURLFromFilename, uploadCloudImage } from "../../_utils";
import { STATUS_CODES } from "../../_utils/constants";
import { supaUpdateProfileImage } from "../../_utils/queries";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: STATUS_CODES.UNAUTHORIZED },
    );
  const rtn: any = {};
  // if image file is uploaded
  if (file) {
    const filename = randomUUID();
    const res = await uploadCloudImage(filename, file);
    if (!res.ok)
      return NextResponse.json(
        { message: "upload image to cloud failed" },
        { status: STATUS_CODES.SERVER_ERROR },
      );
    const { error: pError } = await supaUpdateProfileImage(
      supabase,
      user.id,
      filename,
    );
    if (pError)
      return NextResponse.json(
        { message: "update profile image id failed: " + pError.message },
        { status: STATUS_CODES.SERVER_ERROR },
      );
    rtn.imageURL = getImageURLFromFilename(filename);
  }

  return NextResponse.json({ profile: rtn }, { status: STATUS_CODES.OK });
}
