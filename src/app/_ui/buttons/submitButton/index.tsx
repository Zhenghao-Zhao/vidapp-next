import Spinner from "../../loaders";

export default function SubmitButton({
  submitStatus,
  title,
  disabled,
}: {
  submitStatus: "error" | "idle" | "pending" | "success";
  title: string;
  disabled: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className="bg-blue-500 h-[45px] rounded-md mt-4 text-white disabled:bg-gray-400 flex items-center justify-center"
    >
      {submitStatus === "idle" || submitStatus === "error" ? (
        title
      ) : (
        <Spinner size={20} />
      )}
    </button>
  );
}
