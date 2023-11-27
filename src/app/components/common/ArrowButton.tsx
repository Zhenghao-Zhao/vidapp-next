import { IconType } from "../../assets/Icons";
import IconButton from "./buttons/IconButton";
import { twMerge } from "tailwind-merge"

type Props = {
  className?: string;
  handleClick?: () => void;
}

export default function ArrowButton({ className, handleClick }: Props) {
  return (
    <div className={twMerge("absolute right-0 w-28 h-10 items-center flex", className)}>
      <div className="shrink-0 w-full h-full bg-gradient-to-r from-transparent via-white to-white" />
      <div className="absolute right-0 flex shrink-0 justify-end z-50">
        <IconButton icon={IconType.ArrowRight} handleClick={ handleClick } />
      </div>
    </div>
  )
}