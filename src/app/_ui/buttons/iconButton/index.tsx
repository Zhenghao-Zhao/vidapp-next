import { IconType } from "@/app/_assets/Icons";
import withTooltip from "@/app/_hocs/WithTooltip";
import Icon from "@/app/_ui/icon";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  icon: IconType | string;
  label?: string;
  tip?: string;
  href?: string;
  className?: string;
  iconClassName?: string;
  showHighlight?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
 };

function IconButton({
  icon,
  label,
  href = "",
  className,
  iconClassName,
  showHighlight = true,
  handleClick,
}: Props) {
  return href.length > 0 ? (
    <Link
      href={href}
      className={twMerge(
        `flex flex-shrink-0 items-center ${
          showHighlight && "hover:bg-btn-hover-primary"
        } ${!label && "rounded-full"}`,
        className
      )}
    >
      {<Icon icon={icon} className={iconClassName} />}
      {label && <p>{label}</p>}
    </Link>
  ) : (
    <button
      onClick={handleClick}
      className={twMerge(
        `flex flex-shrink-0 items-center ${
          showHighlight && "hover:bg-btn-hover-primary"
        } ${!label && "rounded-full"}`,
        className
      )}
    >
      {<Icon icon={icon} className={iconClassName} />}
      {label && <p>{label}</p>}
    </button>
  );
}

export default withTooltip(IconButton);
