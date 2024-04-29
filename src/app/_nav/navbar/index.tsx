import { useState } from "react";
import { IconType } from "../../_assets/Icons";
import LinkWithLoader from "../../_common/LinkWithLoader";
import { useGuidebarContext } from "../../_contexts/providers/GuidebarContextProvider";
import { useOverlayContext } from "../../_contexts/providers/OverlayContextProvider";
import IconButton from "../../_ui/buttons/iconButton";
import Icon from "../../_ui/icon";
import { Media } from "../../_utils/constants";
import SearchBar from "./components/SearchBar";
import HeaderMenu from "./navMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { guideLayout, setGuideLayout, setOverlayGuide } = useGuidebarContext();
  const { setScrollTop } = useOverlayContext();

  const toggleGuide = (): void => {
    if (window.innerWidth < Media.GUIDE_BREAKPOINT) {
      setOverlayGuide(true);
      setScrollTop(document.documentElement.scrollTop);
    } else {
      setGuideLayout(1 - guideLayout!);
    }
  };

  return (
    <section className="px-2 flex justify-between items-center fixed w-full top-0 z-20 h-nav-height bg-background-primary space-x-2">
      <div
        className={`${
          isOpen ? "hidden sm:flex" : "flex"
        } items-center shrink-0 h-full px-2 space-x-6`}
      >
        <IconButton icon={IconType.Menu} handleClick={toggleGuide} className="p-2" />
        <LinkWithLoader href="/">
          <Icon twWidth="w-24" icon={IconType.Logo} />
        </LinkWithLoader>
      </div>
      {isOpen && (
        <IconButton
          icon={IconType.ArrowLeft}
          handleClick={() => setIsOpen(false)}
          className="sm:hidden mx-4"
        />
      )}
      <div
        className={`${
          isOpen ? "flex" : "hidden sm:flex"
        } items-center justify-center grow`}
      >
        <SearchBar setIsOpen={setIsOpen} />
      </div>
      <div
        className={`${
          isOpen ? "hidden sm:flex" : "flex"
        } items-center shrink-0 pr-4`}
      >
        <HeaderMenu setIsOpen={setIsOpen} />
      </div>
    </section>
  );
}
