import { IconType } from "@/app/_icons";
import IconButton from "../../../_ui/buttons/iconButton";
import Create from "./Create";
import ProfileMenu from "./ProfileMenu";
import ThemeChanger from "./ThemeChanger";
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
        <ProfileMenu />
      </div>
    </div>
  );
}