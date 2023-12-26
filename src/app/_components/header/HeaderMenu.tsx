import Create from "./Create";
import Notification from "./Notification";
import Profile from "./Profile";
import Voice from "./Voice";
import IconButton from "../common/buttons/IconButton";
import { IconType } from "../../_assets/Icons";
import { useState } from "react";
import { SignUp } from "../auth/SignUpForm";
import { SignIn } from "../auth/SignInForm";
import { Modal, ModalOpener } from "../overlay/Modal";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import { TooltipWrapper } from "../overlay/TooltipWrapper";
import { IconLoader } from "../loaders";

type Props = {
  setIsOpen: (b: boolean) => void;
};

export type AuthForm = "signup" | "signin" | null;

export default function MenuBar({ setIsOpen }: Props) {
  const { user, loading } = useAuthContext();
  const [authForm, setAuthForm] = useState<AuthForm>(null);

  return loading ? (
    <IconLoader />
  ) : (
    <div className="flex items-center">
      <TooltipWrapper title="Search">
        <IconButton
          icon={IconType.SearchIcon}
          handleClick={() => setIsOpen(true)}
          className="sm:hidden"
        />
      </TooltipWrapper>
      <Voice className="sm:hidden" />
      {user ? (
        <>
          <Create />
          <Notification />
          <Profile user={user} />
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
                <SignIn setAuthForm={setAuthForm} />
              ) : (
                <SignUp setAuthForm={setAuthForm} />
              )}
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
