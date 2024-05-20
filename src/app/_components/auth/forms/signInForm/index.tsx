import SubmitButton from "@/app/_components/ui/buttons/submitButton";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signIn } from "../../helpers/wrappers";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, error, status } = useMutation({
    mutationFn: () => signIn(email, password),
    onSuccess: () => window.location.reload(),
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
    <div className="w-[450px]">
      <div className="flex items-center justify-between">
        <p className="text-[25px]">Sign in</p>
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
