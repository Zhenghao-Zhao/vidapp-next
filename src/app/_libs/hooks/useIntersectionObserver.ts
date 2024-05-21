import { useCallback, useRef } from "react";

export default function useIntersectionObserver({
  onIntersect,
  onHidden,
  isReady,
}: {
  onIntersect: () => void;
  onHidden?: () => void;
  isReady?: boolean;
})
{
  const observer = useRef<IntersectionObserver>();
  const endOfListRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (isReady && !isReady) return;
        if (!entries[0].isIntersecting && onHidden) {
          onHidden();
        }
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      });
      observer.current.observe(node);
    },
    [isReady, onIntersect, onHidden]
  );
  return endOfListRef;
}
