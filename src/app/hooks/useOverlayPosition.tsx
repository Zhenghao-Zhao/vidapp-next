import { RefObject, useState } from 'react'

type Position = {
  left: number;
  top: number;
}

const initialPosition: Position = {
  left: 0,
  top: 0,
}

const TOP_MARGIN = 5;
const BOX_SHADOW_WIDTH = 8;

const getPosition = (openerRef: RefObject<HTMLElement>, overlayRef: RefObject<HTMLElement>): Position => {
  if (openerRef.current === null || overlayRef.current === null) return initialPosition;
  const overlay = overlayRef.current;
  const {left, top} = openerRef.current.getBoundingClientRect();
  const nodePosition = {left: left + openerRef.current.offsetWidth/2, 
                        top: top + openerRef.current.offsetHeight}
  const tooltipLeft = Math.max(0, Math.min(nodePosition.left - overlay.offsetWidth / 2, 
                              document.documentElement.offsetWidth - overlay.offsetWidth - BOX_SHADOW_WIDTH));

  return {left: tooltipLeft, top: nodePosition.top + TOP_MARGIN};
}

export default function useOverlayPosition(openerRef: RefObject<HTMLElement>, overlayRef: RefObject<HTMLElement>) {
  const [position, setPosition] = useState<Position>(initialPosition);

  const setOverlayPosition = () => {
    if (!openerRef.current || !overlayRef.current) return;
    const position = getPosition(openerRef, overlayRef);
    setPosition(position);
  }

  return {position, setOverlayPosition};
}
