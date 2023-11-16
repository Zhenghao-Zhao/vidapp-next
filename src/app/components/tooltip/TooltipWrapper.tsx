import { useCallback,  useState } from "react";
import { Position, useStaticContext } from "../../contexts/TooltipContextProvider";

type Props = {
  content: string;
  children: React.ReactNode;
}

export function TooltipWrapper({ content, children }: Props) {
  const { setShow, setPosition, setContent } = useStaticContext();
  const [wrapperPos, setWrapperPos] = useState<Position | null>(null);

  const ref = useCallback((node: HTMLElement | null): HTMLElement | null => {
    if (node != null) {
      const rect = node.getBoundingClientRect();
      const width = node.offsetWidth;
      const height = node.offsetHeight;
      setWrapperPos({x: rect.left + width / 2, y: rect.top + height + 5});
    }
    return node;
  }, [])

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    setContent(content);
    setPosition(wrapperPos!);
    setShow(true);
  }, [content, wrapperPos])

  return (
    <div ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={() => setShow(false)}>
      { children }
    </div>
  )
}