import { IconType } from "../../../../_assets/Icons";
import IconButton from "../../../common/buttons/IconButton";
import Voice from "../Voice";
import Create from "./components/Create/Create";
import Profile from "./components/Profile";

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
      <Voice className="sm:hidden" />
      <div className="flex items-center justify-center gap-2">
        <Create />
        <Profile />
      </div>
    </div>
  );
}
