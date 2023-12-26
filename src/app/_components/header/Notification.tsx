import { IconType } from "../../_assets/Icons";
import { TooltipWrapper } from "../overlay/TooltipWrapper";
import IconButton from "../common/buttons/IconButton";

export default function Notification() {
  return (
    <TooltipWrapper title="Notification">
      <IconButton icon={IconType.NotificationIcon} />
    </TooltipWrapper>
  );
}
