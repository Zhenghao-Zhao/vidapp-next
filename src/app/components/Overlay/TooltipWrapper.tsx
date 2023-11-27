import { isValidElement, cloneElement, useRef, useState, Children} from "react";

type Props = {
  title: string;
  children: React.ReactNode;
}

type Position = {
  left: number;
  top: number;
  arrowLeft: number;
}

export const getPosition = (node: HTMLElement, overlay: HTMLElement): Position => {
  const rect = node.getBoundingClientRect()
  const nodePosition = {left: rect.left + node.offsetWidth/2, top: rect.top + node.offsetHeight}
  const tooltipLeft = Math.max(0, Math.min(nodePosition.left - overlay.offsetWidth / 2, document.documentElement.offsetWidth - overlay.offsetWidth - 8));
  return {left: tooltipLeft, top:nodePosition.top + 5, arrowLeft: nodePosition.left - tooltipLeft - 4};
}

export function TooltipWrapper({ title, children  }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({left: 0, top: 0, arrowLeft: 0});
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>): void => {
    if (e.target === null || tooltipRef.current === null) return;
    const node = e.currentTarget as HTMLElement;
    const tooltip = tooltipRef.current;

    const newPosition = getPosition(node, tooltip);
    setPosition(newPosition)
    setShow(true);
  }

  const handleMouseLeave = () => {
    setShow(false);
  }

  let style = {
    left: position.left + 'px',
    top: position.top + 'px',
  };

  let arrowStyle = {
    left: position.arrowLeft + 'px'
  }

  return (
    <div>
      {isValidElement(children) && cloneElement(children, {...children.props, handleMouseEnter, handleMouseLeave})} 
      <div ref={tooltipRef} style={style} className={`${!show && 'opacity-0'} fixed text-white text-xs bg-tooltip rounded-sm p-1 z-[1002] delay-500 transition-opacity w-max`}>
        <div style={arrowStyle} className="absolute top-0 -translate-y-1/2 rotate-45 w-2 h-2 bg-black" />
        <p>{ title }</p>
      </div>
    </div>
  )
}