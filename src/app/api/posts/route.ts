import { ImageRow, PostRow } from "@/app/_schema/schema";
import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  insertImages,
  insertPost,
  queryPaginatedPostsForUser,
} from "./_queries";
import { uploadCloudImage } from "@/app/api/_utils";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];
  const description = formData.get("text") as string;
  const userID = formData.get("userID") as string;

  if (files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const requests = new Array(files.length);
  const post_id = randomUUID();
  const postCol: PostRow = {
    post_id,
    creator_id: userID,
    description,
  };

  const { error } = await insertPost(postCol);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const images: ImageRow[] = [];
  for (let file of files) {
    const filename = randomUUID();
    requests.push(uploadCloudImage(filename, file));
    images.push({ filename, post_id });
  }

  requests.push(insertImages(images));
  try {
    await Promise.all(requests);
    return NextResponse.json({ message: "Successful" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "9");
  if (page === null || Number.isNaN(limit))
    return NextResponse.json(
      { message: "Bad page number or limit" },
      { status: 400 }
    );

  const from = parseInt(page) * limit;
  const supabase = createRouteSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ message: "Cannot find user" }, { status: 500 });

  const { data, error } = await queryPaginatedPostsForUser(
    from,
    limit,
    user.id
  );
  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });

  const nextCursor = data.length < limit ? null : parseInt(page) + 1;
  return NextResponse.json({ data, nextCursor }, { status: 200 });
}
