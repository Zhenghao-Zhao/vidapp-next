import { useEffect } from "react";
import { Media } from "../../../../_libs/constants";
import { useGuidebarContext } from "../../../../_libs/contexts/providers/GuidebarContextProvider";
import IconButton from "../../../ui/buttons/iconButton";
import Icon from "../../../ui/icon";
import { IconType } from "../../../ui/icons";
import { Backdrop } from "../../../ui/modal";
import Guidebar from "./GuideBar";
import { Link } from "react-transition-progress/next";

export default function OverlayGuide() {
  const { showOverlayGuide, setOverlayGuide } = useGuidebarContext();
  useEffect(() => {
    const media = window.matchMedia(`(min-width:${Media.GUIDE_BREAKPOINT}px)`);
    function handler(e: MediaQueryListEvent) {
      if (e.matches) {
        setOverlayGuide(false);
      }
    }
    media.addEventListener("change", handler);
    return () => {
      media.removeEventListener("change", handler);
    };
  }, []);

  return (
    <>
      <section
        className={`fixed top-0 z-50 h-full ${
          !showOverlayGuide && "-translate-x-full"
        } transition-all bg-background-primary`}
      >
        <div className="flex space-x-6 items-center shrink-0 h-nav-height w-guide-normal px-4">
          <IconButton
            icon={IconType.Menu}
            handleClick={() => setOverlayGuide(false)}
            className="p-2"
          />
          <Link href="/">
            <Icon twSize="w-24" icon={IconType.Logo} />
          </Link>
        </div>
        <Guidebar
          className={`${
            showOverlayGuide ? "max-lgGb:flex" : "max-lgGb:hidden"
          }`}
        />
      </section>
      <Backdrop
        show={showOverlayGuide}
        onClose={() => setOverlayGuide(false)}
      />
    </>
  );
};
