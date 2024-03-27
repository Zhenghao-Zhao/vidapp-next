import React from "react";

type Loader = "icon" | "image" | "segment";

export enum SpinnerSize {
  SMALL = 15,
  MEDIUM = 30,
  LARGE = 45,
}

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

export function ImageLoader() {
  return (
    <div className="bg-black w-full h-full">
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

export default function Spinner({ size = 15 }: { size?: number | SpinnerSize }) {
  const sticks = Array.from({ length: 12 }, (_, i) => (
    <LolliStick key={i} index={i} width={size / 10} />
  ));
  return (
    <div
      className="relative"
      style={{ width: size + "px", height: size + "px" }}
    >
      {sticks}
    </div>
  );
}

function LolliStick({ index = 0, delay = 60, width = 2 }) {
  return (
    <div
      className={`h-1/2 absolute left-1/2`}
      style={{
        transform: `rotate(${30 * index}deg)`,
        transformOrigin: "bottom",
        width,
      }}
    >
      <div
        className="absolute top-0 h-[60%] w-full rounded-lg"
        style={{
          animation: `spinner ${12 * delay}ms ease-in-out ${
            delay * index - 1000
          }ms infinite`,
        }}
      />
    </div>
  );
}

export function Chaser({ color = "#00a1ff" }: { color?: string }) {
  return (
    <div className="absolute w-fit h-fit bg-white rotate-[-90deg]">
      <svg
        className="relative w-[150px] h-[150[x]"
        style={{ animation: "rotate 1s linear infinite" }}
      >
        <circle
          cx="70"
          cy="70"
          r="70"
          className="w-full h-full fill-none stroke-[10] translate-x-[5px] translate-y-[5px]"
          style={{
            stroke: color,
            strokeLinecap: "round",
            strokeDasharray: 440,
            strokeDashoffset: 440,
            animation: "strokeOffset 1s linear infinite",
          }}
        ></circle>
      </svg>
    </div>
  );
}

export function Beam() {
  return (
    <div className="fixed w-full h-[5px] top-0 z-30" style={{animation: "beam 2s linear, iridescent 2s linear infinite"}} />
  )
}
