import React from "react";

type Loader = "icon" | "image" | "segment";

function getLoader(loaderType: Loader) {
  switch (loaderType) {
    case "icon":
      return <IconLoader />;
    case "image":
      return <ImageLoader />;
    case "segment":
      return <SegmentLoader />;
    default:
      return <></>;
  }
}

export function LoadingComponent({
  children,
  isLoading,
  type,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  type: Loader;
}) {
  return isLoading ? getLoader(type) : children;
}

export function IconLoader() {
  return (
    <div className="mx-auto w-40">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full shrink-0 bg-slate-200 h-8 w-8" />
        <div className="flex flex-col justify-between w-full">
          <div className="h-2 bg-slate-200 rounded" />
          <div className="h-2 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function ImageLoader({
  height,
  width,
}: {
  height?: number;
  width?: number;
}) {
  return (
    <div className={`bg-black w-[${width}px] h-[${height}px]`}>
      <div className="animate-pulse w-full h-full bg-slate-200" />
    </div>
  );
}

export function SegmentLoader() {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Spinner() {
  const sticks = Array.from({ length: 12 }, (_, i) => (
    <LolliStick key={i} index={i} />
  ));
  return <div className="w-5 h-fit relative">{sticks}</div>;
}

function LolliStick({ index = 0, delay = 90 }) {
  return (
    <div
      className={`w-1/2 h-[2px] absolute`}
      style={{ transform: `rotate(${30 * index}deg)`, transformOrigin: "left" }}
    >
      <div
        className="absolute right-0 w-[60%] h-full rounded-lg"
        style={{
          animation: `spinner ${12 * delay}ms ease-in-out ${
            delay * index
          }ms infinite`,
        }}
      />
    </div>
  );
}
