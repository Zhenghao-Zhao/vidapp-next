import { IconType } from "@/app/_assets/Icons";
import IconButton from "@/app/_ui/buttons/IconButton";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system"

export default function Theme() {
  const [activeTheme, setActiveTheme] = useState("system");

  useEffect(() => {
    const theme = localStorage.getItem("theme") as Theme;
    switchTheme(theme ?? "system", setActiveTheme)
  }, [])

  const handleClick = () => {

  }
  
  return (
    <IconButton
      icon={activeTheme === "light" ? IconType.Sun : IconType.Moon}
      tip={activeTheme === "light"? "Switch to Dark mode" : "Switch to Light mode"}
      handleClick={handleClick}
    />
  );
}

function switchTheme(theme: Theme, set: (t: Theme) => void) {
  document.documentElement.setAttribute('data-theme', theme);
  set(theme);
}