"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return path.startsWith("/p/") ? children : null;
}
