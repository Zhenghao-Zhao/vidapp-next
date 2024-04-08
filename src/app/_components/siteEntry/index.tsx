"use client";
import AuthPage from "@/app/_authPage";
import Content from "@/app/_layouts/Content";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { Chaser } from "../loaders";

export default function SiteEntry({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const supabase = createClientComponentClient();
    setLoading(true);
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data || !data.session) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <Chaser />
      </div>
    );

  return (
    // <Providers>
    <>{isLoggedIn ? <Content>{children}</Content> : <AuthPage />}</>
    // </Providers>
  );
}
