"use client";
import { chips as chipArray } from "../../_assets/Data";
import { useCallback, useEffect, useRef, useState } from "react";
import ArrowButton from "../common/ArrowButton";

export default function ChipBar() {
  const listRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [selectedChip, setSelectedChip] = useState(chipArray[0]);
  const TRANSLATE_DISTANCE = 200; // 200px per click on arrow button

  useEffect(() => {
    if (!sizeRef.current) return;
    const containerObserver = new ResizeObserver(([entry]) => {
      if (!listRef.current || !containerRef.current) return;
      const container = entry.target;
      containerRef.current!.style.setProperty(
        "width",
        "" + container.clientWidth + "px"
      );
      setShowRight(
        listRef.current.scrollWidth >
          container.clientWidth + listRef.current.scrollLeft
      );
      setShowLeft(listRef.current.scrollLeft > 0);
    });
    containerObserver.observe(sizeRef.current);
    return () => containerObserver.disconnect();
  }, []);

  const chips = chipArray.map((chip, i) => (
    <Chip
      title={chip}
      key={i}
      onSelect={() => {
        setSelectedChip(chip);
      }}
      selectedChip={selectedChip}
    />
  ));

  const handleLeftClick = useCallback((): void => {
    if (!listRef.current) return;
    setShowRight(true);
    const element = listRef.current;
    if (element.scrollLeft < 2 * TRANSLATE_DISTANCE) {
      element.scrollLeft = 0;
      return setShowLeft(false);
    }
    element.scrollLeft -= TRANSLATE_DISTANCE;
  }, []);

  const handleRightClick = useCallback((): void => {
    if (!listRef.current) return;
    setShowLeft(true);
    const element = listRef.current;
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    if (maxScrollLeft - element.scrollLeft < 2 * TRANSLATE_DISTANCE) {
      element.scrollLeft += maxScrollLeft - element.scrollLeft;
      return setShowRight(false);
    }
    element.scrollLeft += TRANSLATE_DISTANCE;
  }, []);

  return (
    <div ref={sizeRef} className="relative h-14 z-10">
      <div
        ref={containerRef}
        className="fixed flex items-center top-14 bg-white h-14 z-20"
      >
        {showLeft && (
          <ArrowButton
            handleClick={handleLeftClick}
            className="rotate-180 left-0"
          />
        )}
        <div
          ref={listRef}
          className="overflow-x-hidden h-full flex items-center scroll-smooth gap-3 text-sm"
        >
          {chips}
        </div>
        {showRight && <ArrowButton handleClick={handleRightClick} />}
      </div>
    </div>
  );
}

type Prop = {
  title: string;
  onSelect: () => void;
  selectedChip: string;
};

export function Chip({ title, onSelect, selectedChip }: Prop) {
  const handleClick = (): void => {
    onSelect();
  };
  const styles =
    selectedChip === title
      ? "bg-black text-white"
      : "hover:bg-btn-hover bg-btn-primary";
  return (
    <button
      onClick={handleClick}
      className={`flex-shrink-0 px-2 py-1.5 rounded-md ${styles}`}
    >
      {title}
    </button>
  );
}
