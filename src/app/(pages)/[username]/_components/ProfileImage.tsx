import emptyProfilePic from "@/app/_assets/static/defaultProfileImage.jpeg";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import Image from "next/image";

export default function ProfileImage() {
  const { profile } = useAuthContext();
  return (
    <div className="w-profile-image-size h-profile-image-size shrink-0 relative rounded-full overflow-hidden">
      <Image
        src={profile?.imageURL ?? emptyProfilePic}
        fill={true}
        alt="Profile image"
        className="w-full h-full object-cover hover:cursor-pointer"
      />
    </div>
  );
}
