import { useState } from "react";
import { AuthForm } from "../header/HeaderMenu";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import { useOverlayContext } from "@/app/_contexts/OverlayContextProvider";
import { toast } from "react-toastify";
import { SIGN_IN_SUCCESS_MESSAGE } from "@/app/constants";

type Props = {
  setAuthForm: (f: AuthForm) => void;
};

type SignInInfo = {
  email: string;
  password: string;
};

export function SignIn({ setAuthForm }: Props) {
  const [SignInInfo, setSignInInfo] = useState<SignInInfo>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { signIn } = useAuthContext();
  const { setShowOverlayBackground } = useOverlayContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await signIn(SignInInfo.email, SignInInfo.password);
    if (error) setError(error.message);
    else {
      setShowOverlayBackground(false);
      toast.success(SIGN_IN_SUCCESS_MESSAGE);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSignInInfo({
      ...SignInInfo,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const isValid = Object.values(SignInInfo).every((value) => value.length > 0);

  return (
    <div className="w-[450px] p-4">
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
            value={SignInInfo.email}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="email"
            onChange={handleChange}
            autoComplete="on"
          />
        </label>
        <label className="mt-2">
          <span>Password</span>
          <input
            type="password"
            value={SignInInfo.password}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="password"
            onChange={handleChange}
            autoComplete="on"
          />
        </label>
        <button
          disabled={!isValid}
          className="bg-btn-emphasis py-2 rounded-md mt-4 text-white disabled:bg-gray-400"
        >
          Submit
        </button>
      </form>
      {error && error.length > 0 && <p className="text-red-500">{error}</p>}
    </div>
  );
}
