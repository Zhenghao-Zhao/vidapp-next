import { IconType } from "../../../_assets/Icons";
import IconButton from "../../../_ui/buttons/iconButton";
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
        className="sm:hidden p-2"
        tip="Search"
      />
      <div className="flex items-center justify-center">
        <ThemeChanger />
        <Create />
        <Profile />
      </div>
    </div>
  );
}
