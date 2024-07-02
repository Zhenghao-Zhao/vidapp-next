"use client";
import SubmitButton from "@/app/_components/ui/buttons/submitButton";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signUp } from "../../utils";
import { VerificationForm } from "../verificationForm";

export type SignUpInfo = {
  email: string;
  password: string;
  username: string;
  name: string;
};

export function SignUpForm() {
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    email: "",
    password: "",
    username: "",
    name: "",
  });
  const [readyToVerify, setReadyToVerify] = useState(false);
  const { mutate, error, status } = useMutation({
    mutationFn: () =>
      signUp(
        signUpInfo.email,
        signUpInfo.password,
        signUpInfo.username,
        signUpInfo.name,
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

  if (readyToVerify) return <VerificationForm email={signUpInfo.email} />;

  return (
    <div className="w-[450px]">
      <div className="flex items-center justify-between">
        <p className="text-[25px]">Sign up</p>
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
        <SubmitButton
          submitStatus={status}
          title="Submit"
          disabled={!isValid || status === "pending" || status === "success"}
        />
      </form>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
