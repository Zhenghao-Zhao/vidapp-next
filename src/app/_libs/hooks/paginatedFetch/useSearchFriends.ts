import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getFriendsSearchResult } from "../../api/queries";
import { Friend, Friendship } from "../../types";

export default function useSearchFriends(
  uid: string,
  friendship: Friendship,
  query: string
) {
  const {
    data,
    isFetching,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["friends", uid, "search", query],
    queryFn: ({ pageParam }) => getFriendsSearchResult(pageParam, uid, friendship, query),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages) => lastPage.nextCursor,
    staleTime: 10 * 60 * 1000,
    refetchOnMount: "always",
    placeholderData: keepPreviousData
  });

  console.log(data)
  const list: Friend[] = useMemo(() => {
    if (!data) return [];
    const allFriends: Friend[] = data.pages.flatMap((page) =>
      page.friends.map((friend: Friend) => friend)
    );
    return allFriends;
  }, [data]);
  return {
    isFetching,
    list,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
}
