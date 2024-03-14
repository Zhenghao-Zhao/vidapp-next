import { NextRequest, NextResponse } from "next/server";
import {
  supaGetPaginatedPosts,
  supaInsertImages,
  supaInsertPost,
} from "./_queries/supabase";
import { ImageRow, PostRow } from "@/app/_schema";
import { randomUUID } from "crypto";
import { uploadCloudImage } from "../../_utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const page = request.nextUrl.searchParams.get("page");
  const LIMIT = 9;
  const username = params.username;

  if (!page) {
    return NextResponse.json(
      { message: "Bad request, missing page number" },
      { status: 500 }
    );
  }

  const from = parseInt(page) * LIMIT;
  const to = from + LIMIT - 1;
  const { data, error } = await supaGetPaginatedPosts(username, from, to);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const nextCursor = data.length < LIMIT ? null : parseInt(page) + 1;
  return NextResponse.json({ data, nextCursor }, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];
  const description = formData.get("text") as string;
  const username = params.username;
  if (files.length < 1) {
    return NextResponse.json({ message: "No upload images" }, { status: 500 });
  }

  const post_id = randomUUID();
  const postCol: PostRow = {
    post_id,
    username,
    description,
  };

  const { error } = await supaInsertPost(postCol);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const requests = new Array(files.length);
  const images: ImageRow[] = [];
  for (let file of files) {
    const filename = randomUUID();
    requests.push(uploadCloudImage(filename, file));
    images.push({ filename, post_id });
  }
  requests.push(supaInsertImages(images));

  try {
    Promise.all(requests);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }

  return NextResponse.json({ message: "Successful" }, { status: 200 });
}
