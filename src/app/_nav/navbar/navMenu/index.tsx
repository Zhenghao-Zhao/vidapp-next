import { IconType } from "../../../_assets/Icons";
import IconButton from "../../../_ui/buttons/IconButton";
import Create from "./components/Create";
import Profile from "./components/Profile";
import ThemeChanger from "./components/ThemeChanger";

type Props = {
  setIsOpen: (b: boolean) => void;
};

export default function HeaderMenu({ setIsOpen }: Props) {
  return (
    <div className="flex items-center">
      <IconButton
        icon={IconType.Search}
        handleClick={() => setIsOpen(true)}
        className="sm:hidden"
        tip="Search"
      />
      <div className="flex items-center justify-center gap-2">
        <ThemeChanger />
        <Create />
        <Profile />
      </div>
    </div>
  );
}
