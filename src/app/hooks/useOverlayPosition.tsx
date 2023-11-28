import { RefObject, useState } from 'react'

type Props = {
  nodeRef: RefObject<HTMLElement>;
  overlayRef: RefObject<HTMLElement>;
}

type Position = {
  left: number;
  top: number;
}

const initialPosition: Position = {
  left: 0,
  top: 0,
}

const getPosition = (nodeRef: RefObject<HTMLElement>, overlayRef: RefObject<HTMLElement>): Position => {
  if (nodeRef.current === null || overlayRef.current === null) return initialPosition;
  const node = nodeRef.current;
  const overlay = overlayRef.current;
  const rect = node.getBoundingClientRect()
  const nodePosition = {left: rect.left + node.offsetWidth/2, top: rect.top + node.offsetHeight}
  const tooltipLeft = Math.max(0, Math.min(nodePosition.left - overlay.offsetWidth / 2, document.documentElement.offsetWidth - overlay.offsetWidth - 8));
  return {left: tooltipLeft, top:nodePosition.top + 5};
}

export default function useOverlayPosition({ nodeRef, overlayRef }: Props) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => {
    if (!nodeRef.current || !overlayRef.current) return;
    if (show) return setShow(false)

    const position = getPosition(nodeRef, overlayRef);
    setPosition(position);
    setShow(true)
  }

  return {position, show, handleClick};
}
