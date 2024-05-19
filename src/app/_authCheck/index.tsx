"use client";
import Auth from "@/app/_components/_auth";
import { createClient } from "@/app/_libs/_utils/supabase/client";
import React, { useEffect, useState } from "react";
import { Chaser } from "../_components/_ui/loaders";
import ContentLayout from "../_layout";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
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

  return <>{isLoggedIn ? <ContentLayout>{children}</ContentLayout> : <Auth />}</>;
}
