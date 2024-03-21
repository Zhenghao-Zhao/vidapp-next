import { ENV } from "@/app/env";
import { NextRequest, NextResponse } from "next/server";
import { supaGetPaginatedPosts } from "./_queries";

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
      { status: 400 }
    );
  }

  const from = parseInt(page) * LIMIT;
  const to = from + LIMIT - 1;
  const { data, error } = await supaGetPaginatedPosts(username, from, to);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  const posts = data.map((post) => {
    const imageURLs = post.images.map((image) => {
      return ENV.R2_BUCKET_URL_PUBLIC + "/" + image.filename;
    });
    const profile = {
      ...post.profiles,
      imageURL:
        post.profiles?.image_filename &&
        ENV.R2_BUCKET_URL_PUBLIC + "/" + post.profiles?.image_filename,
    };
    return {
      created_at: post.created_at,
      description: post.description,
      likes_count: post.likes_count,
      imageURLs: imageURLs,
      profile,
    };
  });
  const nextCursor = data.length < LIMIT ? null : parseInt(page) + 1;
  return NextResponse.json({ posts, nextCursor }, { status: 200 });
}
