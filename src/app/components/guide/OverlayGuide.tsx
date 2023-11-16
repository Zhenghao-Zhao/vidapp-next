import { useEffect } from "react";
import IconButton from "../widgets/IconButton";
import { useGuidebarContext } from "../../contexts/GuidebarContextProvider";
import Guidebar from "./GuideBar";
import { LARGE } from "../../constants";
import { IconType } from "../../assets/Icons";
import Icon from "../common/Icon";


export default function OverlayGuide() {
  const { showOverlay, setShowOverlay } = useGuidebarContext();
  
  useEffect(() => {
    function handler(e:MediaQueryListEvent) {
      if (e.matches) {
        setShowOverlay(false);
      }
    }
    window.matchMedia(`(min-width:${LARGE}px)`).addEventListener('change', handler)

    return () => {
      window.matchMedia(`(min-width:${LARGE}px)`).removeEventListener('change', handler);
    }
  }, [])

  return (
      <section className={`fixed z-[1000] bg-white h-full ${!showOverlay && "-translate-x-full"} transition-all`}>
        <div className= "flex gap-4 items-center shrink-0 h-14 w-guide-normal px-4 bg-white">
          <IconButton icon={IconType.MenuIcon} handleClick={ () => setShowOverlay(false) } />
          <a href="/">
            <Icon className="w-24" icon={IconType.Logo}/>
          </a>
        </div>
        <Guidebar className={`absolute ${showOverlay? "max-lgGb:flex" : "max-lgGb:hidden"}`} />
      </section>
  )
}