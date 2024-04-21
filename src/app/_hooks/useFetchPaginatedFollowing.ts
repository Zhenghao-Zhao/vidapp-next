import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getFollowing } from '../_queries';
import { Following } from '../_types';

export default function useFetchFollowing(owner_uid: string) {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["following", owner_uid],
      queryFn: ({ pageParam }) => getFollowing(pageParam, owner_uid),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _pages) => lastPage.nextCursor,
      refetchOnMount: 'always'
    });
    const list: Following[] = useMemo(() => {
      if (!data) return [];
      const allFollowing: Following[] = data.pages.flatMap((page) =>
        page.following.map((following: Following) => following)
      );
      return allFollowing;
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
