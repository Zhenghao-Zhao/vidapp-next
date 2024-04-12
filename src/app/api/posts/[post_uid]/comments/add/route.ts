import { createClient } from "@/app/_utility/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { supaAddComment } from "../../../_queries";
import { Comment } from "@/app/_types";
import { ENV } from "@/app/env";

export async function POST(
  request: NextRequest,
  { params }: { params: { post_uid: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const comment = formData.get("comment") as string;
  const post_uid = params.post_uid;

  const { data, error } = await supaAddComment(
    supabase,
    post_uid,
    user.id,
    comment
  );

  if (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  if (!data.profiles) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const rst: Comment = {
    uid: data.uid,
    created_at: data.created_at,
    comment,
    from_user: {
      uid: data.profiles.uid,
      username: data.profiles.username,
      name: data.profiles.name,
      imageURL:
        data.profiles.image_filename &&
        ENV.R2_BUCKET_URL_PUBLIC + "/" + data.profiles.image_filename,
    },
  };

  return NextResponse.json(
    rst,
    { status: 200 }
  );
}
