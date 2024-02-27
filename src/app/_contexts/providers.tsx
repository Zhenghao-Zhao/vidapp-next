import GuidebarContextProvider from "./GuidebarContextProvider";
import AuthContextProvider from "./AuthContextProvider";
import OverlayContextProvider from "./OverlayContextProvider";
interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <OverlayContextProvider>
      <GuidebarContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </GuidebarContextProvider>
    </OverlayContextProvider>
  );
}
