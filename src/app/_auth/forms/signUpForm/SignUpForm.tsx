"use client";
import { signUp } from "@/app/_auth/queries/wrappers";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AuthForm } from "../../../_components/navbar/components/navMenu";
import { VerificationForm } from "./components/VerificationForm";

type Props = {
  setAuthForm: (f: AuthForm) => void;
};

type SignUpInfo = {
  email: string;
  password: string;
  username: string;
  name: string;
};

export function SignUpForm({ setAuthForm }: Props) {
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    email: "",
    password: "",
    username: "",
    name: "",
  });
  const [readyToVerify, setReadyToVerify] = useState(false);
  const { mutate, error, isPending } = useMutation({
    mutationFn: () =>
      signUp(
        signUpInfo.email,
        signUpInfo.password,
        signUpInfo.username,
        signUpInfo.name
      ),
    onSuccess: () => {
      setReadyToVerify(true);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSignUpInfo({
      ...signUpInfo,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const isValid = Object.values(signUpInfo).every((value) => value.length > 0);

  if (readyToVerify)
    return (
      <VerificationForm email={signUpInfo.email} setAuthForm={setAuthForm} />
    );

  return (
    <div className="w-[450px] p-4 rounded-md bg-white">
      <div className="flex items-center justify-between">
        <p className="text-[25px]">Sign up</p>
        <div className="text-[15px]">
          Go back to
          <button
            onClick={() => setAuthForm("signin")}
            className="px-2 py-1 rounded-lg bg-btn-primary ml-2 hover:bg-btn-hover transition-all"
          >
            Sign in
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
        <label className="mt-2">
          <span>Username</span>
          <input
            value={signUpInfo.username}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="username"
            onChange={handleChange}
            autoComplete="on"
          />
        </label>
        <label className="mt-2">
          <span>Name</span>
          <input
            value={signUpInfo.name}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="name"
            onChange={handleChange}
            autoComplete="on"
          />
        </label>
        <label className="mt-2">
          <span>Email</span>
          <input
            type="email"
            value={signUpInfo.email}
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
            value={signUpInfo.password}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="password"
            onChange={handleChange}
            autoComplete="on"
          />
        </label>
        <button
          disabled={!isValid}
          type="submit"
          className="bg-btn-emphasis py-2 rounded-md mt-4 text-white disabled:bg-gray-400"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
