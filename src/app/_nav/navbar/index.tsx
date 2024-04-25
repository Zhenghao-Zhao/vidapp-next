import { useState } from "react";
import { IconType } from "../../_assets/Icons";
import LinkWithLoader from "../../_common/LinkWithLoader";
import { useGuidebarContext } from "../../_contexts/providers/GuidebarContextProvider";
import { useOverlayContext } from "../../_contexts/providers/OverlayContextProvider";
import IconButton from "../../_ui/buttons/IconButton";
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
    <section className="flex justify-between items-center fixed w-full top-0 z-20 h-nav-height bg-background-primary">
      <div
        className={`${
          isOpen ? "hidden sm:flex" : "flex"
        } gap-4 items-center shrink-0 h-full px-4`}
      >
        <IconButton icon={IconType.Menu} handleClick={toggleGuide} />
        <LinkWithLoader href="/">
          <Icon twWidth="w-24" icon={IconType.Logo} />
        </LinkWithLoader>
      </div>
      {isOpen && (
        <IconButton
          icon={IconType.Return}
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
