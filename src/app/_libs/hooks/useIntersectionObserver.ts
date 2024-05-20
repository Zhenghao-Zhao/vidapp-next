import { useCallback, useRef } from "react";

export default function useIntersectionObserver(
  readyToLoad: boolean,
  fetchNextPage: () => void
) {
  const observer = useRef<IntersectionObserver>();
  const endOfListRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (!readyToLoad) return;
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });
      observer.current.observe(node);
    },
    [readyToLoad, fetchNextPage]
  );
  return endOfListRef;
}
