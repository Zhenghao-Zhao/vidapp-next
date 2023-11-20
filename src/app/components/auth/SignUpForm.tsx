'use client'
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthForm } from "../header/MenuBar";
import VerificationCodeForm from "./VerificationCodeForm";

type Props = {
  setAuthForm: (f: AuthForm) => void;
}

type SignUpInfo = {
  email: string;
  password: string;
}

export function SignUp({ setAuthForm }: Props) {
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({email: "", password: ""})
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const supabase = createClientComponentClient();
    const email = signUpInfo.email;
    const password = signUpInfo.password;
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })
    setShowResponse(true);
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSignUpInfo({
      ...signUpInfo,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const isValid = Object.values(signUpInfo).every(value => value.length > 0);

  return showResponse? <VerificationCodeForm email={signUpInfo.email}/> : (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-white p-4 rounded-lg z-[1000]">
        <div className="flex items-center justify-between">
          <p className="text-[25px]">Sign up</p>
          <div className="text-[15px]">
            Go back to
            <button onClick={() => setAuthForm('login')} className="px-2 py-1 rounded-lg bg-btn-primary ml-2 hover:bg-btn-hover transition-all">Log in</button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
          <label className="mt-2">
          <span>Email</span>
          <input type="email" className="bg-btn-primary w-full p-2 rounded-md" name="email" onChange={handleChange}/>
          </label>
          <label className="mt-2">
            <span>Password</span>
            <input type="password" className="bg-btn-primary w-full p-2 rounded-md" name="password" onChange={handleChange}/>
          </label>
          <button disabled={!isValid} className="bg-btn-emphasis py-2 rounded-md mt-4 text-white disabled:bg-gray-400">{isSubmitting? "Submitting...":"Submit"}</button>
        </form>
    </div>
  )
}
