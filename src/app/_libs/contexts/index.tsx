"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GuidebarContextProvider from "./providers/GuidebarContextProvider";
import ScrollContextProvider from "./providers/ScrollContextProvider";
import ServerContextProvider from "./providers/ServerContextProvider";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";

interface Props {
  children: React.ReactNode;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: Props) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ServerContextProvider>
        <ScrollContextProvider>
          <GuidebarContextProvider>
            <ProgressBarProvider>
              <ProgressBar className="fixed h-1 shadow-lg shadow-sky-500/20 bg-sky-500 top-0 z-[1000]" />
              {children}
            </ProgressBarProvider>
          </GuidebarContextProvider>
        </ScrollContextProvider>
      </ServerContextProvider>
    </QueryClientProvider>
  );
}
