import withTooltip from "@/app/_hocs/WithTooltip";
import React from "react";

function TooltipButton({ className, onClick, children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}

export default withTooltip(TooltipButton);
