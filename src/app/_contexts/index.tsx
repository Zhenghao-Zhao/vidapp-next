"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataContextProvider from "./DataContextProvider";
import AuthContextProvider from "./AuthContextProvider";
import GuidebarContextProvider from "./GuidebarContextProvider";
import OverlayContextProvider from "./OverlayContextProvider";
import LoaderContextProvider from "./LoaderContextProvider";
interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DataContextProvider>
        <OverlayContextProvider>
          <GuidebarContextProvider>
            <AuthContextProvider>
              <LoaderContextProvider>{children}</LoaderContextProvider>
            </AuthContextProvider>
          </GuidebarContextProvider>
        </OverlayContextProvider>
      </DataContextProvider>
    </QueryClientProvider>
  );
}
