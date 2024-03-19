import { IconType } from "../../../../../_assets/Icons";
import IconButton from "../../../../common/buttons/IconButton";
import { Tooltip } from "../../../../tooltip";

export default function Notification() {
  return (
    <Tooltip title="Notification">
      <IconButton icon={IconType.NotificationIcon} />
    </Tooltip>
  );
}
