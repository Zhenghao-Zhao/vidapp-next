import { IconType } from "../../../_assets/Icons";
import { Tooltip } from "../../tooltip/Tooltip";
import IconButton from "../../common/buttons/IconButton";

export default function Notification() {
  return (
    <Tooltip title="Notification">
      <IconButton icon={IconType.NotificationIcon} />
    </Tooltip>
  );
}
