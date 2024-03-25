"use client";
import Spinner, { SpinnerSize } from "@/app/_components/loaders";
import { Modal } from "@/app/_components/modal";
import PostEntry from "@/app/_components/posts/PostEntry";
import PostView from "@/app/_components/posts/PostView";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import useProfile from "@/app/_hooks/useProfile";
import { getUserPosts } from "@/app/_queries";
import { Post } from "@/app/_types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import ProfileChanger from "./_components/ProfileChanger";
import ProfileImage from "./_components/ProfileImage";
import emptyFolder from "@/app/_assets/static/emptyFolder.jpeg";
import Image from "next/image";

export type PostIndex = {
  pageNum: number;
  index: number;
};

export default function Page({ params }: { params: { username: string } }) {
  const { profile } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState<PostIndex>({
    pageNum: 0,
    index: 0,
  });
  const isOwner = params.username === (profile && profile.username);
  const { profile: userProfile, error: profileError } = useProfile(
    isOwner,
    params.username
  );
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam }) => getUserPosts(pageParam, params.username),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => lastPage.data.nextCursor,
      enabled: !!userProfile,
      staleTime: 1000 * 60 * 15,
    });
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
  if (!data || !userProfile) {
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
              <ProfileImage imageURL={userProfile.imageURL} />
            )}
          </div>
          <div className="grow">
            <p className="mb-[20px] text-2xl font-bold">{userProfile.name}</p>
            <p>
              <span className="mr-2 font-bold">{userProfile.post_count}</span>
              posts
            </p>
          </div>
        </header>
        {!isFetching && data.pages[0].data.posts.length === 0 && (
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
        <div className="grid gap-2">
          {data.pages.map((page, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 w-full">
              {page.data.posts.map((post: Post, j: number) => {
                return (
                  <PostEntry
                    post={post}
                    key={j}
                    onClick={() => {
                      setCurrentPostIndex({ pageNum: i, index: j });
                      setShowModal(true);
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} animation="fade-in-scale">
          {
            <PostView
              post={
                data.pages[currentPostIndex.pageNum].data.posts[
                  currentPostIndex.index
                ]
              }
              postIndex={currentPostIndex}
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
