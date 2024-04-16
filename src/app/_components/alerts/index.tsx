import { useModalContext } from "@/app/_contexts/providers/ModalContextProivder";

export default function DeleteAlert({ onDelete }: { onDelete: () => void }) {
  const { setShow } = useModalContext();
  return (
    <div className="bg-white max-w-[500px] px-10 py-6 flex flex-col rounded-md">
      <p className="text-lg font-bold m-auto">Delete Post</p>
      <div className="text-gray-500 text-center mt-2">
        <p>Are you sure you want to delete this post?</p>
        <p>Deleted posts cannot be recovered.</p>
      </div>
      <button
        onClick={onDelete}
        className="bg-red-600 w-full p-2 rounded-md mt-4 text-white"
      >
        Delete
      </button>
      <button
        onClick={() => setShow(false)}
        className="p-2 rounded-md w-full hover:bg-btn-hover mt-2 border border-gray-300"
      >
        Cancel
      </button>
    </div>
  );
}

export function DiscardAlert({ onConfirm }: { onConfirm?: () => void }) {
  const { setShow } = useModalContext();
  return (
    <div className="bg-white max-w-[500px] px-10 py-6 flex flex-col rounded-md">
      <p className="text-lg font-bold m-auto">Discard Post</p>
      <div className="text-gray-500 text-center mt-2">
        <p>Are you sure you want to discard this post?</p>
      </div>
      <button
        onClick={onConfirm}
        className="bg-red-600 w-full p-2 rounded-md mt-4 text-white"
      >
        Discard
      </button>
      <button
        onClick={() => setShow(false)}
        className="p-2 rounded-md w-full hover:bg-btn-hover mt-2 border border-gray-300"
      >
        Cancel
      </button>
    </div>
  );
}
