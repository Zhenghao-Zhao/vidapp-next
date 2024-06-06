"use client";

import { ModalContent, ModalTrigger } from "@/app/_components/ui/modal";
import Modal from "@/app/_libs/contexts/providers/ModalContextProivder";
import { Profile } from "@/app/_libs/types";
import FollowButton from "../../_components/FollowButton";
import ProfileChanger from "../../_components/ProfileChanger";
import ProfileImage from "../../_components/ProfileImage";
import FriendList from "../../_components/FriendsList";
import { twMerge } from "tailwind-merge";

export default function Header({
  profile,
  isOwner,
}: {
  profile: Profile;
  isOwner: boolean;
}) {
  return (
    <header className="grid g-header-template border-b p-4 mb-4 justify-start items-center">
      <div className="area-profile">
        {isOwner ? (
          <ProfileChanger twSize="size-[120px] sm:size-profile-image-size" />
        ) : (
          <ProfileImage imageURL={profile.imageURL} twSize="size-[120px] sm:size-profile-image-size" />
        )}
      </div>
      <p className="text-2xl font-bold area-name justify-self-start">{profile.name}</p>
      {!isOwner && (
        <FollowButton
          has_followed={profile.has_followed}
          to_uid={profile.uid}
          className="area-follow"
        />
      )}
      <Stats profile={profile} isOwner={isOwner} className="area-stats" />
    </header>
  );
}

function Stats({
  profile,
  isOwner,
  className,
}: {
  profile: Profile;
  isOwner: boolean;
  className: string;
}) {
  return (
    <div className={twMerge("flex gap-[20px] items-center justify-between", className)}>
      <p>
        <span className="mr-2 font-bold">
          {profile.post_count.toLocaleString()}
        </span>
        posts
      </p>
      <Modal>
        <ModalTrigger>
          <button>
            <span className="mr-2 font-bold">{profile.follower_count}</span>
            followers
          </button>
        </ModalTrigger>
        <ModalContent>
          <FriendList uid={profile.uid} friendship="followers" />
        </ModalContent>
      </Modal>
      <Modal>
        <ModalTrigger>
          <button>
            <span className="mr-2 font-bold">{profile.followee_count}</span>
            following
          </button>
        </ModalTrigger>
        <ModalContent>
          <FriendList uid={profile.uid} friendship="followees" />
        </ModalContent>
      </Modal>
    </div>
  );
}
