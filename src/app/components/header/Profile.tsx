import { User } from "@supabase/supabase-js";
import { IconType } from "@/app/assets/Icons";
import { useRef } from "react";
import Icon from "../common/Icon";
import { TooltipWrapper } from "../overlay/TooltipWrapper";
import IconButton from "../common/buttons/IconButton";
import useOverlayPosition from "@/app/hooks/useOverlayPosition";
import { useAuthContext } from "@/app/contexts/AuthContextProvider";

type Props = {
  user: User;
}

export default function Profile({ user }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLButtonElement>(null);
  const {position, show: showDropdown, toggleOverlay} = useOverlayPosition(nodeRef, dropdownRef);
  const { signOut } = useAuthContext()

  const handleClick = async () => {
    const error = await signOut();
    if (error) alert(error.message);
  }

  let style = {
    left: position.left + 'px',
    top: position.top + 'px',
  };

  return (
    <>
      <TooltipWrapper title="Open profile menu">
        <IconButton ref={nodeRef} icon={IconType.User} handleClick={toggleOverlay} />
      </TooltipWrapper>

      <div style={style} ref={dropdownRef} className={`fixed ${!showDropdown && 'opacity-0 invisible'} transition-opacity shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}>
        <div className="py-2 rounded-md bg-white flex flex-col">
          <div className="relative gap-2 h-12">
            <div className="flex p-2">
              <Icon icon={IconType.User} />
              <p>{user.email}</p>
            </div>
            <div className="absolute left-0 right-0 bottom-0 border" />
          </div>
          <div className="flex items-center gap-2 h-12">
            <IconButton icon={IconType.SignOut} name="Sign out" className="gap-2 w-full h-full" handleClick={handleClick}/>
          </div>
        </div>
      </div>
    </>
  )
}