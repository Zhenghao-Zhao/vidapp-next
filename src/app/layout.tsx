import type { Metadata } from "next";
import { PropsWithChildren, Suspense } from "react";
import ContentLayout from "./(pages)/_layout";
import AuthChecker from "./_authCheck";
import Providers from "./_libs/contexts";
import "./globals.css";
import Loading from "./(templates)/loading";

export const metadata: Metadata = {
  title: "TheBlueApp",
  description: "Generated by create next app",
};

export default async function RootLayout({
  modal,
  children,
}: PropsWithChildren<{
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="font-roboto h-full bg-background-primary text-text-primary overscroll-y-none"
    >
      <body className="relative w-full h-full overscroll-none">
        <Providers>
          <Suspense fallback={<Loading />}>
            <AuthChecker>
              <ContentLayout>
                {modal}
                {children}
              </ContentLayout>
            </AuthChecker>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
