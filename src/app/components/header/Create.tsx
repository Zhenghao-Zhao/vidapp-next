import { IconType } from "../../assets/Icons";
import { TooltipWrapper } from "../overlay/TooltipWrapper";
import IconButton from "../common/buttons/IconButton";

export default function Create() {

  return (
      <TooltipWrapper title="Create">
        <IconButton icon={IconType.CreateIcon} />
      </TooltipWrapper>
  )
}