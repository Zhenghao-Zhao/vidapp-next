import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getUserPosts } from "../_queries";
import { Post } from "../_types";

export type PostWithPos = {
  post: Post;
  page: number;
  index: number;
};

export default function useFetchPaginatedPosts(username: string, page = 0) {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["posts", username],
      queryFn: ({ pageParam }) => getUserPosts(pageParam, username),
      initialPageParam: page,
      getNextPageParam: (lastPage, _pages) => lastPage.nextCursor,
      staleTime: 1000 * 60 * 10,
      refetchInterval: 1000 * 60 * 5,
      refetchIntervalInBackground: false,
    });

  const posts = useMemo(() => {
    if (!data) return [];
    const allPosts: PostWithPos[] = data.pages.flatMap((page, i) =>
      page.posts.map((post: Post, j: number) => ({
        post,
        page: i,
        index: j,
      }))
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
