import Link from "next/link";
import { useEffect } from "react";
import { useGuidebarContext } from "../../../_contexts/providers/GuidebarContextProvider";
import { IconType } from "../../../_icons";
import IconButton from "../../../_ui/buttons/iconButton";
import Icon from "../../../_ui/icon";
import { Backdrop } from "../../../_ui/modal";
import { Media } from "../../../_utils/constants";
import Guidebar from "./GuideBar";

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
