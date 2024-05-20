import { IconType, icons } from "../icons";

export default function Icon({
  icon,
  className,
  twSize = "size-6",
}: {
  icon: IconType | string;
  className?: string;
  twSize?: string;
}) {
  return (
    <div className={className}>
      <div className={twSize}>
        <div className="size-full">{icons[icon]}</div>
      </div>
    </div>
  );
}