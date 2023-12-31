import { twMerge } from "tailwind-merge";
import { IconType } from "../../_assets/Icons";
import { TooltipWrapper } from "../overlay/TooltipWrapper";
import IconButton from "../common/buttons/IconButton";

type Props = {
  className?: string;
};

export default function Voice({ className, ...props }: Props) {
  return (
    <TooltipWrapper title="Voice">
      <IconButton
        icon={IconType.VoiceIcon}
        {...props}
        className={twMerge("sm:bg-btn-primary", className)}
      />
    </TooltipWrapper>
  );
}
