"use client";

import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import InfiniteScrollLoader from "@/app/_common/InfiniteScrollLoader";
import useFetchFollowingPosts from "@/app/_hooks/paginatedFetch/useFetchFollowingPosts";
import usePageOnLoad from "@/app/_hooks/usePageOnLoad";
import { ImageSlider } from "@/app/_image/images/common";
import { type Post } from "@/app/_types";
import { getAbsoluteURL, getRelativeDate } from "@/app/_utils";
import { PostOptions } from "@/app/posts/PostView";
import Link from "next/link";

export default function Container({ initData }: { initData: any }) {
  usePageOnLoad();
  const { posts, hasNextPage, isFetching, fetchNextPage } =
    useFetchFollowingPosts(initData);
  return (
    <div className="flex flex-col space-y-10 py-4 w-scroll-view-width">
      {posts.map((data: Post, i: number) => (
        <Post key={i} post={data} />
      ))}
      <div className="h-16 flex justify-center items-center">
        <InfiniteScrollLoader
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </div>
  );
}

function Post({ post }: { post: Post }) {
  return (
    <div className="flex flex-col justify-center border-b">
      <Link
        href={getAbsoluteURL(`p/${post.uid}`)}
        scroll={false}
      >
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
      </Link>
      <div className="aspect-1 max-h-view-maxHeight shrink-0 rounded-lg overflow-hidden">
        <ImageSlider dataURLs={post.imageURLs} />
      </div>
      <PostOptions post={post} />
    </div>
  );
}
