import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getComments } from "../../_queries";
import { Comment } from "../../_types";

export default function useFetchComments(post_uid: string) {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["comments", post_uid],
      queryFn: ({ pageParam }) => getComments(pageParam, post_uid),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _pages) => lastPage.nextCursor,
      staleTime: 1000 * 60 * 10,
      refetchInterval: 1000 * 60 * 10,
      refetchIntervalInBackground: false,
    });
  const comments: Comment[] = useMemo(() => {
    if (!data) return [];
    const allComments: Comment[] = data.pages.flatMap((page) =>
      page.comments.map((comment: Comment) => comment)
    );
    return allComments;
  }, [data]);
  return {
    isFetching,
    comments,
    error,
    hasNextPage,
    fetchNextPage,
  };
}
