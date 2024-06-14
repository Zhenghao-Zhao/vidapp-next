import Icon from "@/app/_components/ui/icon";
import { IconType } from "@/app/_components/ui/icons";
import withTooltip from "@/app/_libs/hocs/WithTooltip";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";
import { Link } from "react-transition-progress/next";
import { twMerge } from "tailwind-merge";

type BaseProps = {
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

type Props = BaseProps & ((ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' }) | (AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'link' }))

const IconButton = forwardRef<HTMLButtonElement & HTMLAnchorElement, Props>(function IconButton({
  icon,
  label,
  href = "",
  className,
  iconClassName,
  showHighlight = true,
  twSize,
  handleClick,
  ...props
}: Props, ref) {
  if (props.as === 'link') {
    const { as, ...rest } = props;
    return (
      <Link
        href={href}
        className={twMerge(
          `flex flex-shrink-0 items-center ${showHighlight && "hover:bg-btn-hover-primary"
          } ${!label && "rounded-full"}`,
          className
        )}
        ref={ref}
        {...rest}
      >
        {<Icon icon={icon} className={iconClassName} twSize={twSize} />}
        {label && <p>{label}</p>}
      </Link>
    )
  }

  const { as, ...rest } = props;
  return (
    <button
      onClick={handleClick}
      className={twMerge(
        `flex flex-shrink-0 items-center ${showHighlight && "hover:bg-btn-hover-primary"
        } ${!label && "rounded-full"}`,
        className
      )}
      ref={ref}
      {...rest}
    >
      {<Icon icon={icon} className={iconClassName} twSize={twSize} />}
      {label && <p className="text-nowrap">{label}</p>}
    </button>
  );
})

export default withTooltip(IconButton);
