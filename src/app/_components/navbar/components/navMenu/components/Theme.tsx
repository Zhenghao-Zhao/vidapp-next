import { IconType } from "@/app/_assets/Icons";
import { IconButton } from "@/app/_components/common";
import { useThemeContext } from "@/app/_contexts/providers/ThemeContextProvider";

export default function Theme() {
  const { toggleTheme, theme } = useThemeContext();
  return (
    <IconButton
      icon={theme === "light" ? IconType.Sun : IconType.Moon}
      tip={theme === "light"? "Switch to Dark mode" : "Switch to Light mode"}
      handleClick={toggleTheme}
    />
  );
}
