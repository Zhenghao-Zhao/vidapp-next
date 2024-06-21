import { Link } from "react-transition-progress/next";
import { useState } from "react";
import { Media } from "../../../_libs/constants";
import { useGuidebarContext } from "../../../_libs/contexts/providers/GuidebarContextProvider";
import Icon from "../../ui/icon";
import { IconType } from "../../ui/icons";
import NavMenu from "./components";
import SearchBar from "./components/SearchBar";
import { IconButton } from "../../ui/buttons";

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
    <nav className="px-2 sticky flex justify-between items-center w-full top-0 z-20 h-nav-height bg-background-primary space-x-2">
      <div
        className={`${isOpen ? "hidden sm:flex" : "flex"
          } items-center shrink-0 h-full px-2 space-x-6`}
      >
        <IconButton as="button" icon={IconType.Menu} handleClick={toggleGuide} className="p-2" />
        <Link href="/">
          <Icon twSize="w-24" icon={IconType.Logo} />
        </Link>
      </div>
      {isOpen && (
        <IconButton
          as="button"
          icon={IconType.ArrowLeft}
          handleClick={() => setIsOpen(false)}
          className="sm:hidden mx-4"
        />
      )}
      <div
        className={`${isOpen ? "flex" : "hidden sm:flex"
          } items-center justify-center grow`}
      >
        <SearchBar />
      </div>
      <div
        className={`${isOpen ? "hidden sm:flex" : "flex"
          } items-center shrink-0 pr-4`}
      >
        <NavMenu setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
}
