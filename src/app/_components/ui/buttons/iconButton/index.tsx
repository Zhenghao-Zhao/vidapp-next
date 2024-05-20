import Icon from "@/app/_components/ui/icon";
import { IconType } from "@/app/_icons";
import withTooltip from "@/app/_libs/hocs/WithTooltip";
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
  twSize?: string,
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
 };

function IconButton({
  icon,
  label,
  href = "",
  className,
  iconClassName,
  showHighlight = true,
  twSize,
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
      {<Icon icon={icon} className={iconClassName} twSize={twSize} />}
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
      {<Icon icon={icon} className={iconClassName} twSize={twSize} />}
      {label && <p>{label}</p>}
    </button>
  );
}

export default withTooltip(IconButton);
