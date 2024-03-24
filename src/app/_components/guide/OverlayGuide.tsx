import { memo, useEffect } from "react";
import { useGuidebarContext } from "../../_contexts/GuidebarContextProvider";
import Guidebar from "./GuideBar";
import { LARGE } from "../../_utility/constants";
import { IconType } from "../../_assets/Icons";
import Icon from "../common/Icon";
import IconButton from "../common/buttons/IconButton";
import { Backdrop } from "../modal";

export default memo(function OverlayGuide() {
  const { showOverlayGuide, setOverlayGuide } = useGuidebarContext();

  useEffect(() => {
    const media = window.matchMedia(`(min-width:${LARGE}px)`);
    function handler(e: MediaQueryListEvent) {
      if (e.matches && showOverlayGuide) setOverlayGuide(false);
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
            icon={IconType.MenuIcon}
            handleClick={() => setOverlayGuide(false)}
          />
          <a href="/">
            <Icon className="w-24" icon={IconType.Logo} />
          </a>
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
});
