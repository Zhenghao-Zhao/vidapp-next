import { getImageURLFromFilename, getOwnerURL } from "@/app/(server)/api/_utils";
import { Pagination, STATUS_CODES } from "@/app/(server)/api/_utils/constants";
import { Post } from "@/app/_libs/types";
import { createClient } from "@/app/_libs/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { supaGetFollowingPosts } from "../../following/_queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: STATUS_CODES.UNAUTHORIZED });

  const page = request.nextUrl.searchParams.get("page");
  const uid = user.id;
  if (!page) {
    return NextResponse.json(
      { message: "Bad request, missing page number" },
      { status: STATUS_CODES.BAD_REQUEST }
    );
  }

  const from = parseInt(page) * Pagination.LIMIT_POSTS;

  const { data, error } = await supaGetFollowingPosts(
    supabase,
    uid,
    from,
    Pagination.LIMIT_POSTS
  );

  if (error) {
    return NextResponse.json({ message: error.message }, { status: STATUS_CODES.SERVER_ERROR });
  }

  const posts: Post[] = data.map((post) => {
    const imageURLs = post.ret_post_images.map((filename) => {
      return getImageURLFromFilename(filename);
    });
    return {
      uid: post.ret_post_uid,
      created_at: post.ret_created_at,
      description: post.ret_description,
      comment_count: post.ret_comment_count,
      like_count: post.ret_like_count,
      imageURLs: imageURLs,
      has_liked: post.ret_has_liked,
      is_owner: false,
      owner: {
        username: post.ret_owner_username,
        name: post.ret_owner_name,
        uid: post.ret_owner_uid,
        has_followed: true,
        imageURL: getImageURLFromFilename(post.ret_owner_profile_image),
        bioURL: getOwnerURL(post.ret_owner_username),
      },
    };
  });
  const nextCursor = data.length < Pagination.LIMIT_POSTS ? null : parseInt(page) + 1;
  return NextResponse.json({ posts, nextCursor }, { status: STATUS_CODES.OK });
}
