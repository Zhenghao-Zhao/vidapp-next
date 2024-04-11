import { useEffect } from "react";
import { IconType } from "../../_assets/Icons";
import { useGuidebarContext } from "../../_contexts/providers/GuidebarContextProvider";
import { LARGE } from "../../_utility/constants";
import Icon from "../common/Icon";
import LinkWithLoader from "../common/LinkWithLoader";
import IconButton from "../common/buttons/IconButton";
import { Backdrop } from "../modal";
import Guidebar from "./GuideBar";

export default function OverlayGuide() {
  const { showOverlayGuide, setOverlayGuide } = useGuidebarContext();
  useEffect(() => {
    const media = window.matchMedia(`(min-width:${LARGE}px)`);
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
        className={`fixed top-0 z-50 bg-white h-full ${
          !showOverlayGuide && "-translate-x-full"
        } transition-all`}
      >
        <div className="flex gap-4 items-center shrink-0 h-nav-height w-guide-normal px-4 bg-white">
          <IconButton
            icon={IconType.Menu}
            handleClick={() => setOverlayGuide(false)}
          />
          <LinkWithLoader href="/">
            <Icon twWidth="w-24" icon={IconType.Logo} />
          </LinkWithLoader>
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
