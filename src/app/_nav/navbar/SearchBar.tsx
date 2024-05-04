import { icons, IconType } from "@/app/_icons";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  setIsOpen: (b: boolean) => void;
};

export default function SearchBar({ className, setIsOpen }: Props) {
  const searchbar = useRef<HTMLInputElement | null>(null);
  const leftSearchIcon = useRef<HTMLInputElement | null>(null);
  const handleFocus = (): void => {
    if (!searchbar.current || !leftSearchIcon.current) return;
    searchbar.current.classList.remove("ml-8");
    searchbar.current.classList.add("pl-8");
    leftSearchIcon.current.removeAttribute("hidden");
    setIsOpen(true);
  };

  const handleBlur = (): void => {
    if (!searchbar.current || !leftSearchIcon.current) return;
    searchbar.current.classList.remove("pl-8");
    searchbar.current.classList.add("ml-8");
    leftSearchIcon.current.setAttribute("hidden", "");
    setIsOpen(false);
  };

  const handleSubmit = () => {
    console.log("submitted");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={twMerge("flex h-10 basis-[600px]", className)}
    >
      <div
        ref={searchbar}
        className="flex items-center relative border border-solid border-r-0 rounded-l-full ml-8 grow bg-background-primary"
      >
        <div ref={leftSearchIcon} className="absolute left-0 pl-3" hidden>
          <div className="w-6">{icons[IconType.Search]}</div>
        </div>
        <input
          className="focus:outline-none ml-3 grow w-full bg-background-primary"
          type="text"
          placeholder="Search"
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="on"
        />
      </div>
      <button
        type="submit"
        className="border border-solid px-5 rounded-r-full flex items-center justify-center"
      >
        <div className="w-6">{icons[IconType.Search]}</div>
      </button>
    </form>
  );
}
