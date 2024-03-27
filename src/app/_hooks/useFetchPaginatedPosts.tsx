import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { getUserPosts } from "../_queries";
import { Post } from "../_types";

export default function useFetchPaginatedPosts(username: string, page = 0) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["posts", username],
      queryFn: ({ pageParam }) => getUserPosts(pageParam, username),
      initialPageParam: page,
      getNextPageParam: (lastPage, pages) => lastPage.data.nextCursor,
      staleTime: 1000 * 60 * 15,
    });

  useEffect(() => {
    if (!data) return;
    const allPosts = data.pages.flatMap((page) => page.data.posts);
    setPosts(allPosts);
  }, [data]);

  return { isFetching, posts, error, hasNextPage, fetchNextPage, updatePosts: setPosts };
}
