import { IconType, icons } from "../../_assets/Icons";

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
        <div className="size-full text-text-primary">{icons[icon]}</div>
      </div>
    </div>
  );
}