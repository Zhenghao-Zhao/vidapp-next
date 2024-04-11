import withTooltip from "@/app/_hocs/WithTooltip";
import { IconType, icons } from "../../_assets/Icons";
import Image from "next/image";

function Icon({
  icon,
  className,
  twWidth = "w-6",
  isImage = false,
}: {
  icon: IconType;
  className?: string;
  twWidth?: string;
  isImage?: boolean;
}) {
  return (
    <div className={className}>
      <div className={twWidth}>
        {isImage ? (
          <Image src={icon} className="object-cover" fill={true} alt="icon" />
        ) : (
          <div className="size-full">{icons[icon]}</div>
        )}
      </div>
    </div>
  );
}

export default withTooltip(Icon);
