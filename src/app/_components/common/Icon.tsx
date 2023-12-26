import { IconType } from "../../_assets/Icons";
import { icons } from "../../_assets/Icons";
import { twMerge } from "tailwind-merge";

type Props = {
  icon: IconType;
  className?: string;
};

export default function Icon({ icon, className }: Props) {
  return <div className={twMerge("w-6", className)}>{icons[icon]}</div>;
}
