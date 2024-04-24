import { IconType } from "@/app/_assets/Icons";
import Icon from "@/app/_ui/icon";
import Link from "next/link";
import { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  icon: IconType;
  name?: string;
  tip?: string;
  className?: string;
  iconClassName?: string;
  url?: string;
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

export default forwardRef(function IconButton(
  {
    icon,
    name,
    tip,
    className,
    iconClassName,
    url = "",
    handleClick,
  }: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return url.length > 0 ? (
    <Link
      href={url}
      className={twMerge(
        `flex flex-shrink-0 items-center hover:bg-btn-hover ${
          !name && "rounded-full"
        }`,
        className
      )}
    >
      {<Icon icon={icon} className={twMerge(iconClassName, 'p-2')} tip={tip} />}
      {name && <p>{name}</p>}
    </Link>
  ) : (
    <button
      ref={ref}
      onClick={handleClick}
      className={twMerge(
        `flex flex-shrink-0 items-center hover:bg-btn-hover ${
          !name && "rounded-full"
        }`,
        className
      )}
    >
      {<Icon icon={icon} className={twMerge(iconClassName, 'p-2')} tip={tip} />}
      {name && <p>{name}</p>}
    </button>
  );
});
