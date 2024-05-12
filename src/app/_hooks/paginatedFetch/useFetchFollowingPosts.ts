import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getFollowingPosts } from "../../_api/queries";
import { Post } from "../../_types";

export default function useFetchFollowingPosts(
  initialData: any,
  page = 0,
) {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["posts", "following"],
      queryFn: ({ pageParam }) => getFollowingPosts(pageParam),
      initialPageParam: page,
      getNextPageParam: (lastPage, _pages) => lastPage.nextCursor,
      staleTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 60 * 5,
      initialData,
    });
  
  const posts = useMemo(() => {
    if (!data) return [];
    const allPosts: Post[] = data.pages.flatMap((page) =>
      page.posts
    );
    return allPosts;
  }, [data]);

  return {
    isFetching,
    posts,
    error,
    hasNextPage,
    fetchNextPage,
  };
}
