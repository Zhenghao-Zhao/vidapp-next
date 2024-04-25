"use client";
import AuthPage from "@/app/_authPage";
import Content from "@/app/_content";
import { createClient } from "@/app/_utils/supabase/client";
import React, { useEffect, useState } from "react";
import { Chaser } from "../../_ui/loaders";

export default function SiteEntry({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const supabase = createClient();
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
      <div className="relative w-full h-full flex items-center justify-center bg-white">
        <Chaser />
      </div>
    );

  return <>{isLoggedIn ? <Content>{children}</Content> : <AuthPage />}</>;
}
