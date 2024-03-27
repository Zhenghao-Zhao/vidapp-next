"use client";
import emptyFolder from "@/app/_assets/static/emptyFolder.jpeg";
import Spinner, { SpinnerSize } from "@/app/_components/loaders";
import { Modal } from "@/app/_components/modal";
import PostEntry from "@/app/_components/posts/PostEntry";
import PostView from "@/app/_components/posts/PostView";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import useFetchPaginatedPosts from "@/app/_hooks/useFetchPaginatedPosts";
import usePageLoader from "@/app/_hooks/usePageLoader";
import { getUserProfile } from "@/app/_queries";
import { Post } from "@/app/_types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import ProfileChanger from "./_components/ProfileChanger";
import ProfileImage from "./_components/ProfileImage";

export default function Page({ params }: { params: { username: string } }) {
  const { profile } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  usePageLoader();

  const isOwner = params.username === (profile && profile.username);
  const { data: userData } = useQuery({
    queryKey: ["userProfile", params.username],
    queryFn: () => getUserProfile(params.username),
    staleTime: 1000 * 60 * 60 * 8,
    retry: false,
  });

  const { posts, isFetching, hasNextPage, fetchNextPage, updatePosts } =
    useFetchPaginatedPosts(params.username);
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
              <ProfileImage imageURL={userData.data.imageURL} />
            )}
          </div>
          <div className="grow">
            <p className="mb-[20px] text-2xl font-bold">{userData.data.name}</p>
            <p>
              <span className="mr-2 font-bold">{userData.data.post_count}</span>
              posts
            </p>
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
          {posts.map((post: Post, j: number) => {
            return (
              <PostEntry
                post={post}
                key={j}
                onClick={() => {
                  setCurrentPostIndex(j);
                  setShowModal(true);
                }}
              />
            );
          })}
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} animation="fade-in-scale">
          {
            <PostView
              post={posts[currentPostIndex]}
              postIndex={currentPostIndex}
              posts={posts}
              updatePosts={updatePosts}
              queryKey={params.username}
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
