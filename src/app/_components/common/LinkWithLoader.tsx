import { useLoaderContext } from "@/app/_contexts/LoaderContextProvider";
import Link from "next/link";
import { useRef } from "react";

export default function LinkWithLoader({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { setShowLoader } = useLoaderContext();
  const ref = useRef<HTMLAnchorElement>(null);
  
  const handleClick = () => {
    if (!ref.current) return;
    if (window.location.href === ref.current.href) return;
    setShowLoader(true);
  };

  return (
    <Link ref={ref} href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
