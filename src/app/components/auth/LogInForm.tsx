
import { useState } from "react"
import { AuthForm } from "../header/MenuBar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

type Props = {
  setAuthForm: (f: AuthForm) => void;
}

type LogInInfo = {
  email: string;
  password: string;
}

export function LogIn({ setAuthForm }: Props) {
  const [logInInfo, setLogInInfo] = useState<LogInInfo>({email: "", password: ""})
  const [error, setError] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: logInInfo.email,
      password: logInInfo.password
    })

    if (error) {
      setError(error.message);
    }else {
      location.reload();
    }
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setLogInInfo({
      ...logInInfo,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const isValid = Object.values(logInInfo).every(value => value.length > 0);

  return (
    <div className="h-[300px] bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-[25px]">Log in</p>
        <div className="text-[15px]">
          Don't have an account? 
          <button onClick={() => setAuthForm('signup')} className="px-2 py-1 rounded-lg bg-btn-primary ml-2 hover:bg-btn-hover transition-all">Sign up</button>
        </div>
      </div>
      <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-2 mt-2">
        <label className="mt-2">
          <span>Email</span>
          <input type="email" className="bg-btn-primary w-full p-2 rounded-md" name="email" onChange={handleChange}/>
        </label>
        <label className="mt-2">
          <span>Password</span>
          <input type="password" className="bg-btn-primary w-full p-2 rounded-md" name="password" onChange={handleChange}/>
        </label>
        <button disabled={!isValid} className="bg-btn-emphasis py-2 rounded-md mt-4 text-white disabled:bg-gray-400">Log in</button>
      </form>
    </div>
  )
}