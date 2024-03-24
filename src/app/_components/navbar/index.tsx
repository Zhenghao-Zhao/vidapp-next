import { memo, useState } from "react";
import { IconType } from "../../_assets/Icons";
import { useGuidebarContext } from "../../_contexts/GuidebarContextProvider";
import { useOverlayContext } from "../../_contexts/OverlayContextProvider";
import { LARGE } from "../../_utility/constants";
import Icon from "../common/Icon";
import IconButton from "../common/buttons/IconButton";
import SearchBar from "./components/SearchBar";
import Voice from "./components/Voice";
import HeaderMenu from "./components/navMenu";

export default memo(function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { guideLayout, setGuideLayout, setOverlayGuide } = useGuidebarContext();
  const { setScrollTop } = useOverlayContext();

  const toggleGuide = (): void => {
    if (window.innerWidth < LARGE) {
      setOverlayGuide(true);
      setScrollTop(document.documentElement.scrollTop);
    } else {
      setGuideLayout(1 - guideLayout!);
    }
  };

  return (
    <section className="flex justify-between items-center fixed w-full top-0 z-20 bg-white h-nav-height">
      <div
        className={`${
          isOpen ? "hidden sm:flex" : "flex"
        } gap-4 items-center shrink-0 h-full px-4`}
      >
        <IconButton icon={IconType.MenuIcon} handleClick={toggleGuide} />
        <a href="/">
          <Icon className="w-24" icon={IconType.Logo} />
        </a>
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
        <div className="p-2">
          <Voice />
        </div>
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
});
