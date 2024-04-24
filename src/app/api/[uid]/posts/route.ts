import { Post } from "@/app/_types";
import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { getImageURLFromFilename } from "../../_utils";
import { Pagination } from "../../_utils/constants";
import { supaGetPaginatedPostsFunction } from "./_queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const page = request.nextUrl.searchParams.get("page");
  const uid = params.uid;
  const from_uid = user.id;
  if (!page) {
    return NextResponse.json(
      { message: "Bad request, missing page number" },
      { status: 400 }
    );
  }

  const from = parseInt(page) * Pagination.LIMIT_POSTS;

  const { data, error } = await supaGetPaginatedPostsFunction(
    supabase,
    uid,
    from_uid,
    from,
    Pagination.LIMIT_POSTS
  );

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const posts: Post[] = data.map((post) => {
    const imageURLs = post.ret_post_images.map((filename) => {
      return getImageURLFromFilename(filename);
    });
    const owner_info = {
      username: post.ret_username,
      name: post.ret_name,
      imageURL: getImageURLFromFilename(post.ret_profile_image),
    };
    return {
      uid: post.ret_uid,
      created_at: post.ret_created_at,
      description: post.ret_description,
      likes_count: post.ret_likes_count,
      imageURLs: imageURLs,
      has_liked: post.ret_has_liked,
      owner: owner_info,
    };
  });
  const nextCursor = data.length < Pagination.LIMIT_POSTS ? null : parseInt(page) + 1;
  return NextResponse.json({ posts, nextCursor }, { status: 200 });
}
