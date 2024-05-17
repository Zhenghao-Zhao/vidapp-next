import Link from "next/link";
import { useState } from "react";
import { useGuidebarContext } from "../../_contexts/providers/GuidebarContextProvider";
import { IconType } from "../../_icons";
import IconButton from "../../_ui/buttons/iconButton";
import Icon from "../../_ui/icon";
import { Media } from "../../_utils/constants";
import SearchBar from "./SearchBar";
import NavMenu from "./navMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { guideLayout, setGuideLayout, setOverlayGuide } = useGuidebarContext();

  const toggleGuide = (): void => {
    if (window.innerWidth < Media.GUIDE_BREAKPOINT) {
      setOverlayGuide(true);
    } else {
      setGuideLayout(1 - guideLayout!);
    }
  };

  return (
    <section className="px-2 sticky flex justify-between items-center w-full top-0 z-20 h-nav-height bg-background-primary space-x-2">
      <div
        className={`${
          isOpen ? "hidden sm:flex" : "flex"
        } items-center shrink-0 h-full px-2 space-x-6`}
      >
        <IconButton icon={IconType.Menu} handleClick={toggleGuide} className="p-2" />
        <Link href="/">
          <Icon twSize="w-24" icon={IconType.Logo} />
        </Link>
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
        <NavMenu setIsOpen={setIsOpen} />
      </div>
    </section>
  );
}
