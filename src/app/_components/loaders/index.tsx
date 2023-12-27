import React from "react";

type Loader = "icon" | "image" | "segment";

function getLoader(loaderType: Loader) {
  switch(loaderType) {
    case "icon":
      return <IconLoader />
    case "image":
      return <ImageLoader />
    case "segment":
      return <SegmentLoader />
    default:
      return <></>
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
    <div className="animate-pulse w-full h-full bg-slate-200 rounded-lg" />
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
