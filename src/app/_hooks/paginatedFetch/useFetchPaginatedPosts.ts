import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getUserPosts } from "../../_api/queries";
import { Post } from "../../_types";

export type PostWithPos = {
  post: Post;
  page: number;
  index: number;
};

export default function useFetchPaginatedPosts(
  uid: string,
  page = 0,
  initialData: any,
) {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["posts", uid],
      queryFn: ({ pageParam }) => getUserPosts(pageParam, uid),
      initialPageParam: page,
      getNextPageParam: (lastPage, _pages) => lastPage.nextCursor,
      staleTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 60 * 5,
      initialData,
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
