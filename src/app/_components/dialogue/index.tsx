import React from "react";

export default function CloseDialogue({
  title,
  description,
  proceedTitle = "Proceed",
  cancelTitle = "Cancel",
  showProceed = true,
  showCancel = true,
}: {
  title: string;
  description: string;
  proceedTitle: string;
  cancelTitle: string;
  showProceed: boolean;
  showCancel: boolean;
}) {
  return <div className="bg-white"></div>;
}
