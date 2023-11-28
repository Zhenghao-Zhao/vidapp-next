import { User } from "@supabase/supabase-js";
import { IconType } from "@/app/assets/Icons";
import { useRef } from "react";
import Icon from "../../common/Icon";
import { TooltipWrapper } from "../../overlay/TooltipWrapper";
import IconButton from "../../common/buttons/IconButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useOverlayPosition from "@/app/hooks/useOverlayPosition";

type Props = {
  user: User;
}

export default function Profile({ user }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLButtonElement>(null);
  const {position, show: showDropdown, handleClick} = useOverlayPosition(nodeRef, dropdownRef)

  const signout = () => {
    const supabase = createClientComponentClient();

    supabase.auth.signOut()
      .then(response => {
        location.reload();
      })
      .catch(error => {
        console.log(error);
      })
  }

  let style = {
    left: position.left + 'px',
    top: position.top + 'px',
  };

  return (
    <>
      <TooltipWrapper title="Open profile menu">
        <IconButton ref={nodeRef} icon={IconType.User} handleClick={handleClick} />
      </TooltipWrapper>

      <div style={style} ref={dropdownRef} className={`fixed ${!showDropdown && 'opacity-0'} transition-opacity shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}>
        <div className="py-2 rounded-md bg-white flex flex-col">
          <div className="relative gap-2 h-12">
            <div className="flex p-2">
              <Icon icon={IconType.User} />
              <p>{user.email}</p>
            </div>
            <div className="absolute left-0 right-0 bottom-0 border" />
          </div>
          <div className="flex items-center gap-2 h-12">
            <IconButton icon={IconType.SignOut} name="Sign out" className="gap-2 w-full h-full" handleClick={signout}/>
          </div>
        </div>
      </div>
    </>
  )
}