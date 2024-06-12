import { twMerge } from "tailwind-merge";
import Throbber from "../../loaders";

export default function SubmitButton({
  submitStatus,
  title,
  disabled,
  className,
}: {
  submitStatus: "error" | "idle" | "pending" | "success";
  title: string;
  disabled: boolean;
  className?: string;
}) {
  return (
    <button
      disabled={disabled}
      className={twMerge("bg-blue-500 h-[45px] rounded-md mt-4 text-white disabled:bg-gray-400 flex items-center justify-center", className)}
    >
      {submitStatus === "idle" || submitStatus === "error" ? (
        title
      ) : (
        <Throbber size={20} />
      )}
    </button>
  );
}
