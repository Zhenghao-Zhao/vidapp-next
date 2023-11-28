import Create from "./Create";
import { IconType } from "../../assets/Icons";
import Notification from "./Notification";
import Profile from "./profile/Profile";
import Voice from "./Voice";
import { useState } from "react";
import { SignUp } from "../auth/SignUpForm";
import { LogIn } from "../auth/LogInForm";
import Modal from "../common/modal";
import { useUserContext } from "@/app/contexts/UserContextProvider";
import IconButton from "../common/buttons/IconButton";
import { TooltipWrapper } from "../overlay/TooltipWrapper";

type Props = {
  setIsOpen: (b: boolean) => void;
}

export type AuthForm = "signup" | "login" | null;

export default function MenuBar({ setIsOpen }: Props) {
  const {user, loading} = useUserContext();
  const [authForm, setAuthForm] = useState<AuthForm>(null);
  
  return loading?(<p>loading...</p>) : (
    <div className="flex items-center">
      <TooltipWrapper title="Search">
        <IconButton icon={IconType.SearchIcon} handleClick={ () => setIsOpen(true) } className="sm:hidden" />
      </TooltipWrapper>
      <Voice className="sm:hidden"/>
      {user?  
        <>
          <Create /><Notification /><Profile user={user}/>
        </> : 
        <>
          <IconButton icon={IconType.SignIn} name="Log in" handleClick={() => setAuthForm('login')} className="text-blue-500 gap-2 border p-1.5 px-2 text-sm rounded-full"/>
          { authForm != null && 
            <Modal onClose={() => setAuthForm(null)}>
              {authForm === 'login'? <LogIn setAuthForm={setAuthForm} /> : <SignUp setAuthForm={setAuthForm} />}
            </Modal>}
        </>
      }
    </div>
  )
}