import { STATIC_PATHS } from "@/app/_libs/constants";
import Image from "next/image";

export default function ProfileImage({
  imageURL,
  twSize = "size-profile-image-size",
}: {
  imageURL: string | null | undefined;
  twSize?: string;
}) {
  return (
    <div className={`${twSize} shrink-0 relative rounded-full overflow-hidden shadow-[0_0_0_1px_grey]`}>
      <Image
        src={imageURL ?? STATIC_PATHS.DEFAULT_PROFILE_IMAGE}
        fill={true}
        alt="Profile image"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
