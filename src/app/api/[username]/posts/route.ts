import { ENV } from "@/app/env";
import { NextRequest, NextResponse } from "next/server";
import {
  supaGetPaginatedPosts,
  supaGetPaginatedPostsFunction,
} from "./_queries";
import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { Post, Profile } from "@/app/_types";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const supabase = createRouteSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const page = request.nextUrl.searchParams.get("page");
  const LIMIT = 9;
  const owner_username = params.username;
  if (!page) {
    return NextResponse.json(
      { message: "Bad request, missing page number" },
      { status: 400 }
    );
  }

  const from = parseInt(page) * LIMIT;
  const to = from + LIMIT - 1;

  const { data, error } = await supaGetPaginatedPostsFunction(
    owner_username,
    from,
    to
  );

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const posts: Post[] = data.map((post) => {
    const imageURLs = post.ret_post_images.map((filename) => {
      return ENV.R2_BUCKET_URL_PUBLIC + "/" + filename;
    });
    const owner_info = {
      username: post.ret_username,
      name: post.ret_name,
      imageURL: ENV.R2_BUCKET_URL_PUBLIC + "/" + post.ret_profile_image,
    };
    return {
      id: post.ret_post_id,
      created_at: post.ret_created_at,
      description: post.ret_description,
      likes_count: post.ret_likes_count,
      imageURLs: imageURLs,
      has_liked: post.ret_has_liked,
      owner: owner_info,
    };
  });
  const nextCursor = data.length < LIMIT ? null : parseInt(page) + 1;
  return NextResponse.json({ posts, nextCursor }, { status: 200 });
}
