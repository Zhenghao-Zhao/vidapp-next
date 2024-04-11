import { twMerge } from "tailwind-merge";
import { IconType } from "../../../_assets/Icons";
import IconButton from "../../common/buttons/IconButton";

export default function Voice({ className }: {className?: string}) {
  return (
    <IconButton
      icon={IconType.Voice}
      className={twMerge("sm:bg-btn-primary", className)}
      tip="Voice"
    />
  );
}
