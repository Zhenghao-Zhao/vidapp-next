import { useEffect } from "react";
import { useGuidebarContext } from "../../contexts/GuidebarContextProvider";
import Guidebar from "./GuideBar";
import { LARGE } from "../../constants";
import { IconType } from "../../assets/Icons";
import Icon from "../common/Icon";
import IconButton from "../common/buttons/IconButton";

export default function OverlayGuide() {
  const { showOverlay, setShowOverlay } = useGuidebarContext();

  useEffect(() => {
    const media = window.matchMedia(`(min-width:${LARGE}px)`);
    function handler(e:MediaQueryListEvent) {
      if (e.matches) setShowOverlay(false);
    }
    media.addEventListener('change', handler)
    return () => {
      media.removeEventListener('change', handler);
    }
  }, [])

  return (
      <>
        <section className={`fixed z-[800] bg-white h-full ${!showOverlay && "-translate-x-full"} transition-all`}>
          <div className= "flex gap-4 items-center shrink-0 h-14 w-guide-normal px-4 bg-white">
            <IconButton icon={IconType.MenuIcon} handleClick={ () => setShowOverlay(false) } />
            <a href="/">
              <Icon className="w-24" icon={IconType.Logo}/>
            </a>
          </div>
          <Guidebar className={`absolute ${showOverlay? "max-lgGb:flex" : "max-lgGb:hidden"}`} />
        </section>
        <div className={`${showOverlay? "fixed" : "hidden"} inset-0 bg-backdrop z-[100]`} onClick={() => setShowOverlay(false)}/>
      </>
  )
}