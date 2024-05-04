import { IconType, icons } from "../../_icons";

export default function Icon({
  icon,
  className,
  twWidth = "w-6",
}: {
  icon: IconType | string;
  className?: string;
  twWidth?: string;
}) {
  return (
    <div className={className}>
      <div className={twWidth}>
        <div className="size-full">{icons[icon]}</div>
      </div>
    </div>
  );
}