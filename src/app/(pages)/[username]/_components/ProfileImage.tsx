import React from "react";
import Image from "next/image";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import emptyProfilePic from "@/app/_assets/static/defaultProfileImage.jpeg";

export default function ProfileImage() {
  const { profile } = useAuthContext();
  return (
    <div className="w-[150px] h-[150px] shrink-0 relative mx-[150px] rounded-full overflow-hidden">
      <Image
        src={profile?.imageURL ?? emptyProfilePic}
        fill={true}
        alt="Profile image"
        className="w-full h-full object-cover hover:cursor-pointer"
      />
    </div>
  );
}
