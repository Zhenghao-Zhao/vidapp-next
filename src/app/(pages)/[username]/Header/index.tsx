"use client";

import { ModalContent, ModalTrigger } from "@/app/_components/modal";
import FollowingList from "@/app/_components/posts/_components/FollowingList";
import Modal from "@/app/_contexts/providers/ModalContextProivder";
import { getUserProfile } from "@/app/_queries";
import { Profile } from "@/app/_types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import FollowButton from "../_components/FollowButton";
import ProfileChanger from "../_components/ProfileChanger";
import ProfileImage from "../_components/ProfileImage";

export default function Header({
  profile,
  isOwner,
}: {
  profile: Profile;
  isOwner: boolean;
}) {
  const { data: userData, error } = useQuery<Profile, AxiosError>({
    queryKey: ["userProfile", profile.uid],
    queryFn: () => getUserProfile(profile.username),
    staleTime: 1000 * 60 * 60 * 8,
    initialData: profile,
    retry: 1,
  });

  if (error?.response?.status === 404) {
    notFound();
  }

  return (
    <header className="flex w-full items-center justify-center border-b p-4 mb-4">
      <div className="mx-[50px]">
        {isOwner ? (
          <ProfileChanger />
        ) : (
          <ProfileImage imageURL={userData.imageURL} />
        )}
      </div>
      <div className="grow">
        <p className="mb-[20px] text-2xl font-bold">{userData.name}</p>
        <div className="flex gap-[20px] items-center">
          <p>
            <span className="mr-2 font-bold">{userData.post_count}</span>
            posts
          </p>
          <button>
            <span className="mr-2 font-bold">{userData.follower_count}</span>
            followers
          </button>
          <Modal>
            <ModalTrigger>
              <button>
                <span className="mr-2 font-bold">{userData.following_count}</span>
                following
              </button>
            </ModalTrigger>
            <ModalContent>
              <FollowingList uid={userData.uid} />
            </ModalContent>
          </Modal>
          {!isOwner && (
            <FollowButton
              has_followed={userData.has_followed}
              uid={userData.uid}
              following_uid={userData.uid}
            />
          )}
        </div>
      </div>
    </header>
  );
}
