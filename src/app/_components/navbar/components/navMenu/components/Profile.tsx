import { IconType } from "@/app/_assets/Icons";
import defaultProfileImage from "@/app/_assets/static/defaultProfileImage.jpeg";
import { signOut } from "@/app/_authPage/queries/wrappers";
import { useDataContext } from "@/app/_contexts/providers/DataContextProvider";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import OutsideCloser from "../../../../common/OutsideCloser";
import IconButton from "../../../../common/buttons/IconButton";
import DropdownWrapper from "../../../../dropdown";
import { Tooltip } from "../../../../tooltip";

export default function Profile() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data } = useDataContext();
  const profileRef = useRef<HTMLButtonElement>(null);
  const { mutate } = useMutation({
    mutationFn: () => signOut(),
    onSuccess: async () => {
      window.location.reload();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClick = async () => {
    mutate();
  };

  return (
    <OutsideCloser onClose={() => setShowDropdown(false)}>
      <Tooltip title="Open profile menu">
        <button
          ref={profileRef}
          onClick={() => setShowDropdown((prev) => !prev)}
          className="w-10 h-10 relative rounded-full overflow-hidden flex items-center justify-center"
        >
          <Image
            src={data?.imageURL || defaultProfileImage}
            alt="profile image"
            className="object-cover w-full h-full"
            fill={true}
          />
        </button>
      </Tooltip>
      {showDropdown && (
        <DropdownWrapper openerRef={profileRef}>
          <div className="py-2 bg-white flex flex-col">
            <div className="relative gap-2 h-12">
              <div className="flex p-2">
                <p>{data?.name}</p>
              </div>
              <div className="absolute left-0 right-0 bottom-0 border" />
            </div>
            <div className="flex items-center gap-2 h-12">
              <IconButton
                icon={IconType.SignOut}
                name="Sign out"
                className="gap-2 w-full h-full"
                handleClick={handleClick}
              />
            </div>
          </div>
        </DropdownWrapper>
      )}
    </OutsideCloser>
  );
}
