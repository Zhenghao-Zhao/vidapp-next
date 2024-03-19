import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import { useState } from "react";
import { IconType } from "../../../../_assets/Icons";
import { SignInForm, SignUpForm } from "../../../../_auth/forms";
import IconButton from "../../../common/buttons/IconButton";
import { IconLoader } from "../../../loaders";
import { Modal, ModalOpener } from "../../../modal";
import { Tooltip } from "../../../tooltip";
import Voice from "../Voice";
import Create from "./components/Create/Create";
import Notification from "./components/Notification";
import Profile from "./components/Profile";

type Props = {
  setIsOpen: (b: boolean) => void;
};

export type AuthForm = "signup" | "signin" | null;

export default function HeaderMenu({ setIsOpen }: Props) {
  const { profile, isLoading } = useAuthContext();
   const [authForm, setAuthForm] = useState<AuthForm>(null);
  return isLoading ? (
    <IconLoader />
  ) : (
    <div className="flex items-center">
      <Tooltip title="Search">
        <IconButton
          icon={IconType.SearchIcon}
          handleClick={() => setIsOpen(true)}
          className="sm:hidden"
        />
      </Tooltip>
      <Voice className="sm:hidden" />
      {profile ? (
        <>
          <Create />
          <Notification />
          <Profile profile={profile} />
        </>
      ) : (
        <>
          <ModalOpener onClick={() => setAuthForm("signin")}>
            <IconButton
              icon={IconType.SignIn}
              name="Sign in"
              className="text-blue-500 gap-2 border p-1.5 px-2 text-sm rounded-full"
            />
          </ModalOpener>
          {authForm != null && (
            <Modal onClose={() => setAuthForm(null)}>
              {authForm === "signin" ? (
                <SignInForm setAuthForm={setAuthForm} />
              ) : (
                <SignUpForm setAuthForm={setAuthForm} />
              )}
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
