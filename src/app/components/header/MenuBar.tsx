import Create from "../widgets/Create";
import { IconType } from "../../assets/Icons";
import Notification from "../widgets/Notification";
import Profile from "../widgets/Profile";
import Voice from "../widgets/Voice";
import IconButton from "../widgets/IconButton";

type Props = {
  setIsOpen: (b: boolean) => void;
}

export default function MenuBar({ setIsOpen }: Props) {
  return (
    <div className="flex items-center">
      <IconButton icon={IconType.SearchIcon} handleClick={ () => setIsOpen(true) } className="sm:hidden" tip="Search"/>
      <Voice className="sm:hidden"/>
      <Create />
      <Notification />
      <Profile />
    </div>
  )
}