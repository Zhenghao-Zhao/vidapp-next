import { User } from "@supabase/supabase-js";
import { IconType } from "@/app/_assets/Icons";
import { useRef, useState } from "react";
import Icon from "../../../../common/Icon";
import { Tooltip } from "../../../../tooltip/Tooltip";
import IconButton from "../../../../common/buttons/IconButton";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import DropdownWrapper from "../../../../dropdown/DropdownWrapper";
import OutsideCloser from "../../../../common/OutsideCloser";
import { toast } from "react-toastify";
import { SIGN_OUT_SUCCESS_MESSAGE } from "@/app/constants";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/app/_auth/queries";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Profile } from "@/app/_schema/schema";

export default function Profile({ profile }: {profile: Profile}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);
  const client = createClientComponentClient();
  const { refetch } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: () => signOut(client),
    onSuccess: () => {
      refetch();
      setShowDropdown(false);
      toast.success(SIGN_OUT_SUCCESS_MESSAGE);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClick = async () => {
    mutate();
  };

  return (
    <>
      <OutsideCloser onClose={() => setShowDropdown(false)}>
        <Tooltip title="Open profile menu">
          <IconButton
            ref={profileRef}
            icon={IconType.User}
            handleClick={() => setShowDropdown((prev) => !prev)}
          />
        </Tooltip>
        {showDropdown && (
          <DropdownWrapper openerRef={profileRef}>
            <div className="py-2 bg-white flex flex-col">
              <div className="relative gap-2 h-12">
                <div className="flex p-2">
                  <Icon icon={IconType.User} />
                  <p>{profile.username}</p>
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
    </>
  );
}
