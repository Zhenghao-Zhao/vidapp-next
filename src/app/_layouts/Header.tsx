import Voice from "../_components/header/Voice";
import MenuBar from "../_components/header/HeaderMenu";
import SearchBar from "../_components/header/SearchBar";
import { memo, useState } from "react";
import { useGuidebarContext } from "../_contexts/GuidebarContextProvider";
import { LARGE } from "../constants";
import { IconType } from "../_assets/Icons";
import Icon from "../_components/common/Icon";
import IconButton from "../_components/common/buttons/IconButton";
import { useOverlayContext } from "../_contexts/OverlayContextProvider";

export default memo(function PageHeader() {
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
    <section className="flex justify-between items-center fixed w-full top-0 z-20 bg-white h-14">
      <div
        className={`${
          isOpen ? "hidden sm:flex" : "flex"
        } gap-4 items-center shrink-0 h-14 px-4`}
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
        <MenuBar setIsOpen={setIsOpen} />
      </div>
    </section>
  );
});
