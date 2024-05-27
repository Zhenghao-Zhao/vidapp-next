"use client";

import { InfiniteScrollLoader } from "@/app/_components/common";
import useFetchFollowingPosts from "@/app/_libs/hooks/paginatedFetch/useFetchFollowingPosts";
import usePageOnLoad from "@/app/_libs/hooks/usePageOnLoad";
import { Post } from "@/app/_libs/types";
import { FollowingFeed } from "../_components/Feed";

export default function Content({ initData }: { initData: any }) {
  usePageOnLoad();
  const { posts, hasNextPage, isFetching, fetchNextPage } =
    useFetchFollowingPosts(initData);
  return (
    <main className="flex flex-col space-y-10 py-4 w-scroll-view-width">
      {posts.map((data: Post, i: number) => (
        <FollowingFeed key={i} post={data} />
      ))}
      <div className="h-16 flex justify-center items-center">
        <InfiniteScrollLoader
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </main>
  );
}