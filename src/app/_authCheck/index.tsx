"use client";
import Auth from "@/app/_components/auth";
import { createClient } from "@/app/_libs/utils/supabase/client";
import { PropsWithChildren, useEffect, useState } from "react";
import ContentLayout from "../(pages)/_layout";
import { Spinner } from "../_components/ui/loaders";

export default function AuthCheck({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const supabase = createClient();
    setLoading(true);
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data || !data.user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-white">
        <Spinner />
      </div>
    );

  return <>{isLoggedIn ? <ContentLayout>{children}</ContentLayout> : <Auth />}</>;
}
