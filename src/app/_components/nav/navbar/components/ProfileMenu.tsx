import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import { signOut } from "@/app/_components/auth/helpers/wrappers";
import { IconButton } from "@/app/_components/ui/buttons";
import {
  DropdownContent,
  DropdownTrigger,
} from "@/app/_components/ui/dropdown";
import { IconType } from "@/app/_components/ui/icons";
import TooltipWrapper from "@/app/_components/ui/tooltip";
import Dropdown from "@/app/_libs/contexts/providers/DropdownContextProvider";
import { useDataContext } from "@/app/_libs/contexts/providers/ServerContextProvider";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function ProfileMenu() {
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
    <div>
      <Dropdown>
        <TooltipWrapper>
          <DropdownTrigger>
            <button
              ref={profileRef}
              className="relative flex items-center justify-center p-2"
            >
              <ProfileImage
                imageURL={data!.profile.imageURL}
                twSize="size-10"
              />
            </button>
          </DropdownTrigger>
        </TooltipWrapper>
        <DropdownContent>
          <IconButton
            icon={IconType.SignOut}
            label="Sign out"
            className="gap-2 w-fit h-full p-2 shrink-0"
            handleClick={handleClick}
          />
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
