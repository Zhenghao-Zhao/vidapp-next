"use client";
import emptyFolder from "@/app/_assets/static/emptyFolder.jpeg";
import Spinner, { SpinnerSize } from "@/app/_components/loaders";
import { Modal } from "@/app/_components/modal";
import PostEntry from "@/app/_components/posts/PostEntry";
import PostView from "@/app/_components/posts/PostView";
import { useDataContext } from "@/app/_contexts/providers/DataContextProvider";
import useFetchPaginatedPosts, { PostWithPos } from "@/app/_hooks/useFetchPaginatedPosts";
import usePageLoader from "@/app/_hooks/usePageLoader";
import { getUserProfile } from "@/app/_queries";
import { Profile } from "@/app/_types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import FollowButton from "../_components/FollowButton";
import ProfileChanger from "../_components/ProfileChanger";
import ProfileImage from "../_components/ProfileImage";

export default function PageContent({uid}: {uid: string}) {
  const { data: ownerData } = useDataContext();
  const [showPostView, setShowPostView] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  usePageLoader();
  const isOwner = uid === ownerData!.user_id;
  const { data: userData, error } = useQuery<Profile, AxiosError>({
    queryKey: ["userProfile", uid],
    queryFn: () => getUserProfile(uid),
    staleTime: 1000 * 60 * 60 * 8,
    retry: 1,
  });
  const { posts, isFetching, hasNextPage, fetchNextPage } =
    useFetchPaginatedPosts(uid);
  const observer = useRef<IntersectionObserver>();
  const endOfListRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (isFetching || !hasNextPage) return;
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });
      observer.current.observe(node);
    },
    [isFetching, hasNextPage, fetchNextPage]
  );

  if (error?.response?.status === 404) {
    notFound();
  }

  if (!userData) {
    return (
      <div className="grow flex items-center justify-center">
        <div className="h-16">
          <Spinner size={SpinnerSize.MEDIUM} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col grow">
      <div className="max-w-grid-max-width w-full h-full m-auto">
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
              <p>
                <span className="mr-2 font-bold">
                  {userData.follower_count}
                </span>
                followers
              </p>
              {!isOwner && (
                <FollowButton
                  has_followed={userData.has_followed}
                  uid={uid}
                />
              )}
            </div>
          </div>
        </header>
        {!isFetching && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center m-[100px]">
            <div className="size-[150px] relative">
              <Image
                src={emptyFolder}
                alt="image"
                fill={true}
                className="object-cover"
              />
            </div>
            <p className="text-xl">Looks like there are no posts here</p>
          </div>
        )}
        <div className="grid gap-2 grid-cols-3 w-full">
          {posts.map((post: PostWithPos, j: number) => {
            return (
              <PostEntry
                post={post.post}
                key={j}
                onClick={() => {
                  setCurrentPostIndex(j);
                  setShowPostView(true);
                }}
              />
            );
          })}
        </div>
      </div>
      {showPostView && (
        <Modal onClose={() => setShowPostView(false)} animation="fade-in-scale">
          {
            <PostView
              postData={posts[currentPostIndex]}
              queryKey={uid}
              isOwner={isOwner}
              setShowPostView={setShowPostView}
            />
          }
        </Modal>
      )}
      <div className="h-16 flex justify-center items-center">
        {(hasNextPage || isFetching) && (
          <div ref={endOfListRef}>
            <Spinner size={SpinnerSize.MEDIUM} />
          </div>
        )}
      </div>
    </div>
  );
}
