import { User } from "@supabase/supabase-js";
import { IconType } from "@/app/assets/Icons";
import { useRef, useState } from "react";
import Icon from "../../common/Icon";
import { TooltipWrapper, getPosition } from "../../overlay/TooltipWrapper";
import IconButton from "../../common/buttons/IconButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Props = {
  user: User;
}

type Position = {
  left: number;
  top: number;
  arrowLeft: number;
}

export default function Profile({ user }: Props) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ left: 0, top: 0, arrowLeft: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!e.target || !dropdownRef.current) return;
    if (showDropdown) return setShowDropdown(false)

    const node = e.currentTarget as HTMLElement;
    const position = getPosition(node, dropdownRef.current);
    setPosition(position);
    setShowDropdown(true)
  }

  const signout = () => {
    const supabase = createClientComponentClient();
    supabase.auth.signOut()
      .then(response => {
        console.log(response);
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
        <IconButton icon={IconType.User} handleClick={handleClick} />
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