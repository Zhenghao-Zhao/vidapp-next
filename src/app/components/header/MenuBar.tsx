import Create from "../widgets/Create";
import { IconType } from "../../assets/Icons";
import Notification from "../widgets/Notification";
import Profile from "../widgets/Profile";
import Voice from "../widgets/Voice";
import IconButton from "../widgets/IconButton";
import { useCallback, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SignUp } from "../auth/SignUpForm";
import Backdrop from "../common/Backdrop";
import { LogIn } from "../auth/LogInForm";

type Props = {
  setIsOpen: (b: boolean) => void;
}

export type AuthForm = "signup" | "login" | null;

export default function MenuBar({ setIsOpen }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [authForm, setAuthForm] = useState<AuthForm>(null);


  const fetchUser = useCallback(async() => {
    const supabase = createClientComponentClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    setUser(user);
  }, [])
  
  useEffect(() => {
    fetchUser().catch(console.error)
  }, [])
  
  return (
    <div className="flex items-center">
      <IconButton icon={IconType.SearchIcon} handleClick={ () => setIsOpen(true) } className="sm:hidden" tip="Search"/>
      <Voice className="sm:hidden"/>
      {user?  
        <>
          <Create />
          <Notification />
          <Profile user={user}/>
        </> : 
        <>
          <IconButton icon={IconType.SignIn} name="Log in" handleClick={() => setAuthForm('login')} className="text-blue-500 gap-2 border p-1.5 px-2 text-sm"/>
          { authForm != null && 
          <>
            {authForm === 'login'? <LogIn setAuthForm={setAuthForm} /> : <SignUp setAuthForm={setAuthForm} />}
            <Backdrop show={true} onClose={() => setAuthForm(null)} />
          </>}
        </>
      }
    </div>
  )
}