import { signIn } from "@/app/_auth/queries/wrappers";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AuthForm } from "../../../_components/navbar/components/navMenu";

type Props = {
  setAuthForm: (f: AuthForm) => void;
};

export function SignInForm({ setAuthForm }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {fetchProfile} = useAuthContext();
  const { mutate, error, isPending } = useMutation({
    mutationFn: () => signIn(email, password),
    onSuccess: () => fetchProfile()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const isValid = email.length > 0 && password.length > 0;

  return (
    <div className="w-[450px] p-4 bg-white rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-[25px]">Sign in</p>
        <div className="text-[15px]">
          {"Don't have an account?"}
          <button
            onClick={() => setAuthForm("signup")}
            className="px-2 py-1 rounded-lg bg-btn-primary ml-2 hover:bg-btn-hover transition-all"
          >
            Sign up
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-2 mt-2"
      >
        <label className="mt-2">
          <span>Email</span>
          <input
            type="email"
            value={email}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="email"
            onChange={handleEmailChange}
            autoComplete="on"
          />
        </label>
        <label className="mt-2">
          <span>Password</span>
          <input
            type="password"
            value={password}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="password"
            onChange={handlePasswordChange}
            autoComplete="on"
          />
        </label>
        <button
          disabled={!isValid}
          className="bg-btn-emphasis py-2 rounded-md mt-4 text-white disabled:bg-gray-400"
        >
          {isPending ? "Sumitting..." : "Submit"}
        </button>
      </form>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
