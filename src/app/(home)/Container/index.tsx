"use client";

import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import useFetchFollowingPosts from "@/app/_hooks/paginatedFetch/useFetchFollowingPosts";
import { PostWithPos } from "@/app/_hooks/paginatedFetch/useFetchPosts";
import usePageLoader from "@/app/_hooks/usePageLoader";
import { ImageSlider } from "@/app/_image/images/common";
import { getRelativeDate } from "@/app/_utils";
import PostFooter from "@/app/posts/components/PostFooter";

export default function Container({ initData }: { initData: any }) {
  usePageLoader();
  const { posts } = useFetchFollowingPosts(initData);
  return (
    <div className="flex flex-col space-y-10 py-4">
      {posts.map((data: PostWithPos, i: number) => (
        <Post key={i} postData={data} />
      ))}
    </div>
  );
}

function Post({ postData }: { postData: PostWithPos }) {
  const post = postData.post;
  return (
    <div className="flex flex-col justify-center border-b">
      <div className="pl-2">
        <div className="flex items-center pb-4">
          <div className="mr-4">
            <ProfileImage imageURL={post.owner.imageURL} twSize="size-12" />
          </div>
          <p className="whitespace-nowrap text-ellipsis">{post.owner.name}</p>
        </div>
        {post.description && (
          <p className="flex items-center pb-2">{post.description}</p>
        )}
        <p className="text-xs text-text-secondary pb-2">
          {getRelativeDate(post.created_at)}
        </p>
      </div>
      <div className="w-view-image-width aspect-1 max-h-view-maxHeight shrink-0 rounded-lg overflow-hidden">
        <ImageSlider dataURLs={post.imageURLs} />
      </div>
      <PostFooter postData={postData} queryKey="following" />
    </div>
  );
}
