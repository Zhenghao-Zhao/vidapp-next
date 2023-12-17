import { User } from "@supabase/supabase-js";
import { IconType } from "@/app/assets/Icons";
import { useRef, useState } from "react";
import Icon from "../common/Icon";
import { TooltipWrapper } from "../overlay/TooltipWrapper";
import IconButton from "../common/buttons/IconButton";
import { useAuthContext } from "@/app/contexts/AuthContextProvider";
import DropdownWrapper from "../overlay/DropdownWrapper";
import OutsideCloser from "../overlay/OutsideCloser";

type Props = {
  user: User;
}

export default function Profile({ user }: Props) {
  const { signOut } = useAuthContext()
  const [ show, setShow ] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);

  const handleClick = async () => {
    setShow(false);
    const error = await signOut();
    if (error) alert(error.message);
  }

  return (
    <>
      <OutsideCloser onClose={() => setShow(false)}>
        <TooltipWrapper title="Open profile menu">
          <IconButton ref={profileRef} icon={IconType.User} handleClick={() => setShow(prev => !prev)} />
        </TooltipWrapper>
        <DropdownWrapper openerRef={profileRef} show={show} >
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
        </DropdownWrapper>
      </OutsideCloser>
    </>
  )
}