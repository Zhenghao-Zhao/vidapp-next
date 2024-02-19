import { IconType } from "@/app/_assets/Icons";
import { Icon } from "@/app/_components/common";
import Spinner from "@/app/_components/loaders/Loaders";
import React from "react";

export default function Header({
  onPrev,
  onNext,
  title,
  isPending=false,
}: {
  onPrev: () => void;
  onNext: () => void;
  title: string;
  isPending?: boolean;
}) {
  return (
    <div className="h-upload-header w-full bg-white relative">
      <div className="text-lg font-bold w-full h-full flex justify-center items-center absolute">
        {title}
      </div>
      <div className="float-left h-full flex items-center justify-center relative">
        <button onClick={onPrev} className="ml-[10px]">
          <Icon icon={IconType.ArrowLeft} />
        </button>
      </div>
      <div className="float-right h-full flex items-center justify-center relative">
        <div className="mr-[20px]">
          {isPending ? (
            <Spinner />
          ) : (
            <button
              onClick={onNext}
              className="flex items-center justify-center font-[500]"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
