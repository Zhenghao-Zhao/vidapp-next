"use client";

import { useLoaderContext } from "@/app/_contexts/providers/LoaderContextProvider";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useTransition } from "react";

/**
 * A custom Link component that wraps Next.js's next/link component.
 */
export function Link({
  href,
  children,
  replace,
  ...rest
}: Parameters<typeof NextLink>[0]) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setShowLoader } = useLoaderContext();

  useLayoutEffect(() => {
    if (isPending) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isPending]);

  return (
    <NextLink
      href={href}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          const url = href.toString();
          if (replace) {
            router.replace(url);
          } else {
            router.push(url);
          }
        });
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
