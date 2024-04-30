import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import { IconType } from "@/app/_assets/Icons";
import { signOut } from "@/app/_authPage/queries/wrappers";
import { useDataContext } from "@/app/_contexts/providers/DataContextProvider";
import Dropdown from "@/app/_contexts/providers/DropdownContextProvider";
import { DropdownContent, DropdownTrigger } from "@/app/_ui/dropdown";
import TooltipWrapper from "@/app/_ui/tooltip";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "react-toastify";
import IconButton from "../../../../_ui/buttons/iconButton";

export default function Shortcut() {
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
          <div className="flex items-center h-12">
            <IconButton
              icon={IconType.SignOut}
              label="Sign out"
              className="gap-2 w-full h-full p-2"
              handleClick={handleClick}
            />
          </div>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
