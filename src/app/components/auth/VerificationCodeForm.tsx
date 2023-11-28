import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";

const TOTAL = 6;

type VeriProps = {
  count?: number;
  email: string;
}

export default function VerificationCodeForm({ count=TOTAL, email }: VeriProps) {
  const [keys, setKeys] = useState<string[]>(Array(count).fill(""));
  const [current, setCurrent] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const isValid = keys.every(k => k.length > 0);
  const cubes = [];
  const ref = useRef<HTMLFormElement>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (!isValid || !ref.current) return;
    ref.current.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
  }, [isValid])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const token = keys.join('');
    const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email'})
    setSubmitting(false);
    if (error) console.log(error);
    else location.reload();
  }

  for (let i = 0; i < count; i++) {
    cubes.push(<Cube key={i} current={current} setCurrent={setCurrent} index={i} keys={keys} setKeys={setKeys} />)
  }
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-[1000] flex flex-col gap-2">
      <p className="text-[25px] font-semibold">Verify your email address </p>
      <p className="font-semibold">Enter your verification code</p>
      <p>We sent a 6-digit code to <span className="font-semibold">{email}</span></p>
      <p>Confirm it belongs to you to keep your account secure.</p>
      <form ref={ref} onSubmit={handleSubmit}>
        <div className="flex justify-between gap-4 mt-2">{cubes}</div>
        <button disabled={!isValid} type="submit" className="bg-btn-emphasis py-2 rounded-md mt-4 text-white disabled:bg-gray-400 w-full">{submitting? "Submitting...":"Submit"}</button>
      </form>
    </div>
  )
}

type CubeProps = {
  index: number;
  current: number;
  setCurrent: (i: number) => void;
  keys: string[];
  setKeys: (k: string[]) => void;
}

function Cube({ index, current, setCurrent, keys, setKeys }: CubeProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current === null) return;
    if (index === current) {
      ref.current.focus();
    }
  }, [current])

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newKeys = keys.map((k, i) => {
      if (i === index) return e.currentTarget.value;
      return k;
    })
    setKeys(newKeys);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      setTimeout(() => setCurrent(Math.max(0, current-1)));
    } else if (/[0-9]/.test(e.key)) {
      setTimeout(() => setCurrent(Math.min(current+1, TOTAL-1)));
    } else {
      e.preventDefault();
    }
  }

  return (
    <input className="p-2 outline rounded-md text-center" ref={ref} type="text" size={1} onInput={handleInput} maxLength={1} onKeyDown={handleKeyDown} />
  )
}