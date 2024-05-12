"use client";
import InfiniteScrollLoader from "@/app/_common/InfiniteScrollLoader";
import useFetchPaginatedPosts from "@/app/_hooks/paginatedFetch/useFetchPosts";
import usePageLoader from "@/app/_hooks/usePageLoader";
import { Post, Profile } from "@/app/_types";
import { STATIC_PATHS } from "@/app/_utils/constants";
import PostEntry from "@/app/posts/PostEntry";
import Image from "next/image";
import Link from "next/link";

export default function Body({
  initialData,
  profile,
}: {
  initialData: any;
  profile: Profile;
}) {
  usePageLoader();
  const { posts, isFetching, hasNextPage, fetchNextPage } =
    useFetchPaginatedPosts(profile.uid, initialData);
  return (
    <div>
      {!isFetching && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center m-[100px]">
          <div className="size-[150px] relative">
            <Image
              src={STATIC_PATHS.EMPTY_FOLDER}
              alt="image"
              fill={true}
              className="object-cover"
            />
          </div>
          <p className="text-xl">Looks like there are no posts here</p>
        </div>
      )}
      <div className="grid gap-2 grid-cols-3 w-full">
        {posts.map((post: Post, j: number) => {
          return (
            <Link href={`p/${post.uid}`} key={j} scroll={false}>
              <PostEntry
                post={post}
              />
            </Link>
          );
        })}
      </div>
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
