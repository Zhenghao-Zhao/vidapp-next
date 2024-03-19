import { twMerge } from "tailwind-merge";
import { IconType, icons } from "../../_assets/Icons";

type Props = {
  icon: IconType;
  className?: string;
};

export default function Icon({ icon, className }: Props) {
  return <div className={twMerge("w-6", className)}>{icons[icon]}</div>;
}
