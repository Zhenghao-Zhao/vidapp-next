import Create from "./Create";
import { IconType } from "../../assets/Icons";
import Notification from "./Notification";
import Profile from "./Profile";
import Voice from "./Voice";
import { useState } from "react";
import { SignUp } from "../auth/SignUpForm";
import { SignIn } from "../auth/SignInForm";
import Modal from "../common/modal";
import { useAuthContext } from "@/app/contexts/AuthContextProvider";
import IconButton from "../common/buttons/IconButton";
import { TooltipWrapper } from "../overlay/TooltipWrapper";

type Props = {
  setIsOpen: (b: boolean) => void;
}

export type AuthForm = "signup" | "signin" | null;

export default function MenuBar({ setIsOpen }: Props) {
  const { user, loading } = useAuthContext();
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
          <IconButton icon={IconType.SignIn} name="Sign in" handleClick={() => setAuthForm('signin')} className="text-blue-500 gap-2 border p-1.5 px-2 text-sm rounded-full"/>
          { authForm != null && 
            <Modal onClose={() => setAuthForm(null)}>
              {authForm === 'signin'? <SignIn setAuthForm={setAuthForm} /> : <SignUp setAuthForm={setAuthForm} />}
            </Modal>}
        </>
      }
    </div>
  )
}