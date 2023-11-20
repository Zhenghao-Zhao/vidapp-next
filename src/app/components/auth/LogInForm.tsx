
import { login } from "@/app/actions"
import { useState } from "react"
import { AuthForm } from "../header/MenuBar";

type Props = {
  setAuthForm: (f: AuthForm) => void;
}

export function LogIn({ setAuthForm }: Props) {
  const [isComplete, setIsComplete] = useState<boolean>(false);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-white p-4 rounded-lg z-[1000]">
      <div className="flex items-center justify-between">
        <p className="text-[25px]">Log in</p>
        <div className="text-[15px]">
          Don't have an account? 
          <button onClick={() => setAuthForm('signup')} className="px-2 py-1 rounded-lg bg-btn-primary ml-2 hover:bg-btn-hover transition-all">Sign up</button>
        </div>
      </div>
      <form action={login} method="post" className="flex flex-col gap-2 mt-2">
        <label className="mt-2">
          <span>Email</span>
          <input type="email" className="bg-btn-primary w-full p-2 rounded-md" name="email"/>
        </label>
        <label className="mt-2">
          <span>Password</span>
          <input type="password" className="bg-btn-primary w-full p-2 rounded-md" name="password"/>
        </label>
        <button disabled={!isComplete} className="bg-btn-emphasis py-2 rounded-md mt-4 text-white disabled:bg-gray-400">Log in</button>
      </form>
    </div>
  )
}