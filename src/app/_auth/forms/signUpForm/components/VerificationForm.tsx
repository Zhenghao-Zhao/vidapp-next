import { SIGN_UP_SUCCESS_MESSAGE } from "@/app/constants";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import { useOverlayContext } from "@/app/_contexts/OverlayContextProvider";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@/app/_auth/queries/wrappers";

const VERIFICATION_CODE_LENGTH = 6;

type VeriProps = {
  count?: number;
  email: string;
};

export function VerificationForm({
  count = VERIFICATION_CODE_LENGTH,
  email,
}: VeriProps) {
  const [keys, setKeys] = useState(Array(count).fill(""));
  const [current, setCurrent] = useState(0);
  const { setOverlayIsShown } = useOverlayContext();
  const { setUser } = useAuthContext();
  const { mutate, error, isPending } = useMutation({
    mutationFn: () => verifyEmail(email, keys.join("")),
    onSuccess: (data) => {
      setUser(data);
      setOverlayIsShown(false);
      toast.success(SIGN_UP_SUCCESS_MESSAGE);
    },
  });

  const isValid = keys.every((k) => k.length > 0);
  const cubes = [];
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isValid || !ref.current) return;
    ref.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  }, [isValid]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  for (let i = 0; i < count; i++) {
    cubes.push(
      <Cube
        key={i}
        cursorIndex={current}
        setCursorIndex={setCurrent}
        index={i}
        keys={keys}
        setKeys={setKeys}
        submitting={isPending}
      />
    );
  }
  return (
    <div className="w-[450px] p-4 rounded-md bg-white">
      <p className="text-[25px] font-semibold">Verify your email address </p>
      <p className="font-semibold">Enter your verification code</p>
      <p>
        We sent a 6-digit code to <span className="font-semibold">{email}</span>
      </p>
      <p>Confirm it belongs to you to keep your account secure.</p>
      <form ref={ref} onSubmit={handleSubmit}>
        <div className="flex justify-between mt-4 gap-4">{cubes}</div>
        <button
          disabled={!isValid || isPending}
          type="submit"
          className="bg-btn-emphasis py-2 rounded-md mt-4 text-white disabled:bg-gray-400 w-full"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}

type CubeProps = {
  index: number;
  cursorIndex: number;
  keys: string[];
  submitting: boolean;
  setCursorIndex: (i: number) => void;
  setKeys: (k: string[]) => void;
};

function Cube({
  index,
  cursorIndex,
  keys,
  submitting,
  setCursorIndex,
  setKeys,
}: CubeProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current === null) return;
    if (index === cursorIndex) {
      ref.current.focus();
    }
  }, [cursorIndex, index]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newKeys = keys.map((k, i) => {
      if (i === index) return e.currentTarget.value;
      return k;
    });
    setKeys(newKeys);
  };

  // filter input key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      setTimeout(() => setCursorIndex(Math.max(0, cursorIndex - 1)));
    } else if (/[0-9]/.test(e.key)) {
      // check if cube has been occupied, if so jump to the next cube immediately
      if (keys[index].length > 0) {
        return setCursorIndex(
          Math.min(cursorIndex + 1, VERIFICATION_CODE_LENGTH - 1)
        );
      }
      setTimeout(() =>
        setCursorIndex(Math.min(cursorIndex + 1, VERIFICATION_CODE_LENGTH - 1))
      );
    } else {
      e.preventDefault();
    }
  };

  return (
    <input
      className="w-10 py-2 outline rounded-md text-center"
      ref={ref}
      value={keys[index]}
      type="text"
      size={1}
      onInput={handleInput}
      maxLength={1}
      onKeyDown={handleKeyDown}
      autoComplete="off"
      disabled={submitting}
    />
  );
}
