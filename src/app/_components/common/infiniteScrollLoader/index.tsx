import useIntersectionObserver from "@/app/_libs/hooks/useIntersectionObserver";
import Spinner, { SpinnerSize } from "../../ui/loaders";

export default function InfiniteScrollLoader({
  hasNextPage,
  isFetching,
  fetchNextPage,
  loaderSize = SpinnerSize.MEDIUM,
}: {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  loaderSize?: number;
}) {
  const endOfListRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    isReady: !isFetching && hasNextPage,
  });
  if (!hasNextPage && !isFetching) return null;

  return (
    <div ref={endOfListRef} className="p-2 m-auto">
      <Spinner size={loaderSize} />
    </div>
  );
}
