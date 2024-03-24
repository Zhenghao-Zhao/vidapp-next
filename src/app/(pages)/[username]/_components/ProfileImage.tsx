import emptyProfilePic from "@/app/_assets/static/defaultProfileImage.jpeg";
import Image from "next/image";

export default function ProfileImage({ imageURL }: { imageURL: string | null | undefined }) {
  return (
    <div className="w-profile-image-size h-profile-image-size shrink-0 relative rounded-full overflow-hidden">
      <Image
        src={imageURL ?? emptyProfilePic}
        fill={true}
        alt="Profile image"
        className="w-full h-full object-cover hover:cursor-pointer"
      />
    </div>
  );
}