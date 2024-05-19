"use client";

import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import InfiniteScrollLoader from "@/app/_components/_common/InfiniteScrollLoader";
import { ImageSlider } from "@/app/_components/_posts/components/Carousel";
import { PostOptions } from "@/app/_components/_posts/PostView";
import useFetchFollowingPosts from "@/app/_libs/_hooks/paginatedFetch/useFetchFollowingPosts";
import usePageOnLoad from "@/app/_libs/_hooks/usePageOnLoad";
import { type Post as Feed } from "@/app/_libs/_types";
import { getAbsoluteURL, getRelativeDate } from "@/app/_libs/_utils";
import Link from "next/link";

export default function Content({ initData }: { initData: any }) {
  usePageOnLoad();
  const { posts, hasNextPage, isFetching, fetchNextPage } =
    useFetchFollowingPosts(initData);
  return (
    <div className="flex flex-col space-y-10 py-4 w-scroll-view-width">
      {posts.map((data: Feed, i: number) => (
        <Feed key={i} post={data} />
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

function Feed({ post }: { post: Feed }) {
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
