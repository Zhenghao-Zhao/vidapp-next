import { twMerge } from "tailwind-merge";
import { IconType } from "../../../_assets/Icons";
import IconButton from "../../common/buttons/IconButton";
import { Tooltip } from "../../tooltip";

type Props = {
  className?: string;
};

export default function Voice({ className, ...props }: Props) {
  return (
    <Tooltip title="Voice">
      <IconButton
        icon={IconType.VoiceIcon}
        {...props}
        className={twMerge("sm:bg-btn-primary", className)}
      />
    </Tooltip>
  );
}
