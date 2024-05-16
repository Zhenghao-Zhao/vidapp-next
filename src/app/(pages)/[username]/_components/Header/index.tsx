"use client";

import Modal from "@/app/_contexts/providers/ModalContextProivder";
import { Profile } from "@/app/_types";
import { ModalContent, ModalTrigger } from "@/app/_ui/modal";
import FriendList from "@/app/posts/components/FriendsList";
import FollowButton from "../FollowButton";
import ProfileChanger from "../ProfileChanger";
import ProfileImage from "../ProfileImage";

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
                  {profile.following_count}
                </span>
                following
              </button>
            </ModalTrigger>
            <ModalContent>
              <FriendList uid={profile.uid} friendship='following'/>
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
