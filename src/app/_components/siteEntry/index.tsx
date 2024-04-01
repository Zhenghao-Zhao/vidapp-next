"use client";
import { LoginForm } from "@/app/_authPage/components/signInForm";
import Providers from "@/app/_contexts";
import Content from "@/app/_layouts/Content";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { Chaser } from "../loaders";
import AuthPage from "@/app/_authPage";

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
      <div className="w-full h-full flex items-center justify-center">
        <Chaser />
        <p>Loading...</p>
      </div>
    );

  return (
    <Providers>
      {isLoggedIn ? <Content>{children}</Content> : <AuthPage />}
    </Providers>
  );
}
