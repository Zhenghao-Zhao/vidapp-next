import { IconType } from "@/app/_assets/Icons";
import withTooltip from "@/app/_hocs/WithTooltip";
import Icon from "@/app/_ui/icon";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  icon: IconType | string;
  label?: string;
  tip?: string;
  className?: string;
  iconClassName?: string;
  url?: string;
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
  showHighlight?: boolean;
};

function IconButton({
  icon,
  label,
  className,
  iconClassName,
  url = "",
  handleClick,
  showHighlight = true,
}: Props) {
  return url.length > 0 ? (
    <Link
      href={url}
      className={twMerge(
        `flex flex-shrink-0 items-center ${
          showHighlight && "hover:bg-hightlight-primary"
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
          showHighlight && "hover:bg-hightlight-primary"
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
