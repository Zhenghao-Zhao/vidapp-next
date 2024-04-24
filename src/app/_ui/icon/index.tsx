import withTooltip from "@/app/_hocs/WithTooltip";
import { IconType, icons } from "../../_assets/Icons";

function Icon({
  icon,
  className,
  twWidth = "w-6",
}: {
  icon: IconType;
  className?: string;
  twWidth?: string;
}) {
  return (
    <div className={className}>
      <div className={twWidth}>
        <div className="size-full text-text-primary">{icons[icon]}</div>
      </div>
    </div>
  );
}

export default withTooltip(Icon);
