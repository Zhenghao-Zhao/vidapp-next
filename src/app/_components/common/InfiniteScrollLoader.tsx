import useIntersectionObserver from "@/app/_hooks/useIntersectionObserver";
import React from "react";
import Spinner, { SpinnerSize } from "../loaders";

export default function InfiniteScrollLoader({
  hasNextPage,
  isFetching,
  fetchNextPage,
  loaderSize=SpinnerSize.MEDIUM,
}: {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  loaderSize?: number,
}) {
  const endOfListRef = useIntersectionObserver(
    !isFetching && hasNextPage,
    fetchNextPage
  );
  if (!hasNextPage && !isFetching) return null;

  return (
    <div ref={endOfListRef} className="p-2 m-auto">
      <Spinner size={loaderSize} />
    </div>
  );
}
