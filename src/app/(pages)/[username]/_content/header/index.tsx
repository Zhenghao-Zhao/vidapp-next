"use client";

import FriendList from "@/app/_components/posts/components/FriendsList";
import { ModalContent, ModalTrigger } from "@/app/_components/ui/modal";
import Modal from "@/app/_libs/contexts/providers/ModalContextProivder";
import { Profile } from "@/app/_libs/types";
import FollowButton from "../../_components/FollowButton";
import ProfileChanger from "../../_components/ProfileChanger";
import ProfileImage from "../../_components/ProfileImage";

export default function Header({
  profile,
  isOwner,
}: {
  profile: Profile;
  isOwner: boolean;
}) {

  return (
    <header className="flex w-full items-center justify-center border-b p-4 mb-4">
      <div className="mx-[50px]">
        {isOwner ? (
          <ProfileChanger />
        ) : (
          <ProfileImage imageURL={profile.imageURL} />
        )}
      </div>
      <div className="grow">
        <p className="mb-[20px] text-2xl font-bold">{profile.name}</p>
        <div className="flex gap-[20px] items-center">
          <p>
            <span className="mr-2 font-bold">{profile.post_count}</span>
            posts
          </p>
          <Modal>
            <ModalTrigger>
              <button>
                <span className="mr-2 font-bold">
                  {profile.follower_count}
                </span>
                followers
              </button>
            </ModalTrigger>
            <ModalContent>
              <FriendList uid={profile.uid} friendship='followers' />
            </ModalContent>
          </Modal>
          <Modal>
            <ModalTrigger>
              <button>
                <span className="mr-2 font-bold">
                  {profile.followee_count}
                </span>
                following
              </button>
            </ModalTrigger>
            <ModalContent>
              <FriendList uid={profile.uid} friendship='followees'/>
            </ModalContent>
          </Modal>
          {!isOwner && (
            <FollowButton
              has_followed={profile.has_followed}
              to_uid={profile.uid}
            />
          )}
        </div>
      </div>
    </header>
  );
}
