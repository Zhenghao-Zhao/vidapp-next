'use client'
import { useStaticContext } from "../../contexts/TooltipContextProvider";
import { twMerge } from "tailwind-merge"

type Props = {
  className?: string;
}

export function Tooltip({ className }: Props) {
  const { position, content, show} = useStaticContext();

  let style = position? {
    left: position.x + 'px',
    top: position.y + 'px',
    transform: 'translate(-50%)'
  } : {};

  return (
    <div style={ style } className={twMerge(`${!show && 'opacity-0'} fixed text-white text-xs bg-tooltip rounded-sm p-1 z-[1002] transition-opacity`, className)}>
      <p>{ content }</p>
    </div>
  )
}