import Dropdown from "@/app/_contexts/providers/DropdownContextProvider";
import IconButton from "@/app/_ui/buttons/IconButton";
import { DropdownContent, DropdownTrigger } from "@/app/_ui/dropdown";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export default function ThemeChanger() {
  const [activeTheme, setActiveTheme] = useState("system");

  function ThemeEntry({ label, id }: { label: string; id: Theme }) {
    return (
      <IconButton
        label={label}
        icon={id}
        className={`hover:bg-hightlight-primary rounded-lg px-2 py-1 ${
          id === activeTheme && "bg-hightlight-primary"
        }`}
        iconClassName="mr-2"
        handleClick={() => switchTheme(id, setActiveTheme)}
      />
    );
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme") as Theme;
    switchTheme(theme ?? "system", setActiveTheme);
  }, []);

  return (
    <Dropdown>
      <DropdownTrigger>
        <IconButton icon={activeTheme} tip="Change theme" />
      </DropdownTrigger>
      <DropdownContent>
        <div className="rounded-lg p-2 flex flex-col space-y-1">
          <ThemeEntry label="System default" id="system" />
          <ThemeEntry label="Light" id="light" />
          <ThemeEntry label="Dark" id="dark" />
        </div>
      </DropdownContent>
    </Dropdown>
  );
}

function switchTheme(theme: Theme, set: (t: Theme) => void) {
  document.documentElement.setAttribute("data-theme", theme);
  set(theme);
  localStorage.setItem("theme", theme);
}
