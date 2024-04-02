"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataContextProvider from "./providers/DataContextProvider";
import GuidebarContextProvider from "./providers/GuidebarContextProvider";
import LoaderContextProvider from "./providers/LoaderContextProvider";
import OverlayContextProvider from "./providers/OverlayContextProvider";
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
            <LoaderContextProvider>{children}</LoaderContextProvider>
          </GuidebarContextProvider>
        </OverlayContextProvider>
      </DataContextProvider>
    </QueryClientProvider>
  );
}
