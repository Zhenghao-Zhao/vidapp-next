import { IconType } from "@/app/_assets/Icons";
import Icon from "@/app/_components/common/Icon";
import Link from "next/link";
import { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  icon: IconType;
  name?: string;
  className?: string;
  fill?: string;
  url?: string;
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
};

export default forwardRef(function IconButton(
  {
    icon,
    name,
    className,
    fill,
    url = "",
    handleClick,
  }: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return url.length > 0 ? (
    <Link
      href={url}
      className={twMerge(
        `flex flex-shrink-0 items-center hover:bg-btn-hover p-2 ${
          !name && "rounded-full"
        }`,
        className
      )}
    >
      {<Icon icon={icon} className={fill} />}
      {name && <p>{name}</p>}
    </Link>
  ) : (
    <button
      ref={ref}
      onClick={handleClick}
      className={twMerge(
        `flex flex-shrink-0 items-center hover:bg-btn-hover p-2 ${
          !name && "rounded-full"
        }`,
        className
      )}
    >
      {<Icon icon={icon} className={fill} />}
      {name && <p>{name}</p>}
    </button>
  );
});
