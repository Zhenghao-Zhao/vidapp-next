"use client"
import GuidebarContextProvider from "./GuidebarContextProvider";
import AuthContextProvider from "./AuthContextProvider";
import OverlayContextProvider from "./OverlayContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayContextProvider>
        <GuidebarContextProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </GuidebarContextProvider>
      </OverlayContextProvider>
    </QueryClientProvider>
  );
}
