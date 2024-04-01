"use client";
import React, { useEffect, useState } from "react";
import { LoginForm } from "./components/signInForm";
import { SignUpForm } from "./components/signUpForm";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html!.style.overflowY = "auto";
    return () => {
      html!.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className={`bg-white flex flex-col rounded p-4`}>
        <div className="border-b pb-4">
          {isSignUp && <SignUpForm />}
          {!isSignUp && <LoginForm />}
        </div>
        <button onClick={() => setIsSignUp(prev => !prev)} className="mt-2 hover:underline">
          <p>
            {isSignUp && "Already have an account? Sign in"}
            {!isSignUp && "Don't have an account? Sign up"}
          </p>
        </button>
      </div>
    </div>
  );
}
