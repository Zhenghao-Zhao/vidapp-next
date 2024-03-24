import { ENV } from "@/app/env";
import { NextRequest, NextResponse } from "next/server";
import { supaGetPaginatedPosts } from "./_queries";
import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { Post, Profile } from "@/app/_types";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const page = request.nextUrl.searchParams.get("page");
  const LIMIT = 9;
  const owner_username = params.username;
  const supabase = createRouteSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser()
  const user_username = user?.user_metadata.username;
  if (!page) {
    return NextResponse.json(
      { message: "Bad request, missing page number" },
      { status: 400 }
    );
  }

  const from = parseInt(page) * LIMIT;
  const to = from + LIMIT - 1;
  const { data, error } = await supaGetPaginatedPosts(owner_username, from, to);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const posts: Post[] = data.map((post) => {
    const imageURLs = post.images.map((image) => {
      return ENV.R2_BUCKET_URL_PUBLIC + "/" + image.filename;
    });
    const profile: Profile = {
      ...post.profiles!,
      imageURL:
        post.profiles!.image_filename &&
        ENV.R2_BUCKET_URL_PUBLIC + "/" + post.profiles!.image_filename,
      post_count: data.length,
    };
    const has_liked = post.likes.find((like) => {
      return like.from_username === user_username;
    }) !== undefined;
    return {
      id: post.post_id,
      created_at: post.created_at,
      description: post.description,
      likes_count: post.likes_count,
      imageURLs: imageURLs,
      has_liked,
      owner: profile,
    };
  });
  const nextCursor = data.length < LIMIT ? null : parseInt(page) + 1;
  return NextResponse.json({ posts, nextCursor }, { status: 200 });
}
