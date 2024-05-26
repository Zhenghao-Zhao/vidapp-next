import useIntersectionObserver, {
  IntersectionObserverType,
} from "@/app/_libs/hooks/useIntersectionObserver";
import React from "react";

export default function IntersectObserver({
  onIntersect,
  onHidden,
  isReady,
  className,
}: {
  className?: string;
} & IntersectionObserverType) {
  const ref = useIntersectionObserver({ onIntersect, onHidden, isReady });

  return <div ref={ref} className={className} />;
}
