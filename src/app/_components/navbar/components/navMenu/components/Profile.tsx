import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import { IconType } from "@/app/_assets/Icons";
import { signOut } from "@/app/_authPage/queries/wrappers";
import TooltipWrapper from "@/app/_ui/tooltip";
import { useDataContext } from "@/app/_contexts/providers/DataContextProvider";
import Dropdown from "@/app/_contexts/providers/DropdownContextProvider";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "react-toastify";
import IconButton from "../../../../../_ui/buttons/IconButton";
import DropdownContent, { DropdownTrigger } from "../../../../../_ui/dropdown";

export default function Profile() {
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
        <TooltipWrapper tip="Open profile menu">
          <DropdownTrigger>
            <button
              ref={profileRef}
              className="size-10 relative flex items-center justify-center"
            >
              <ProfileImage imageURL={data!.profile.imageURL} twSize="size-10" />
            </button>
          </DropdownTrigger>
        </TooltipWrapper>
        <DropdownContent>
          <div className="py-2 bg-modal-primary flex flex-col">
            <div className="relative gap-2 h-12">
              <div className="flex p-2">
                <p>{data!.profile.name}</p>
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
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
