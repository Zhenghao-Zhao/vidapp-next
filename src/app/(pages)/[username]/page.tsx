"use client";
import Spinner, { SpinnerSize } from "@/app/_components/loaders";
import { Modal } from "@/app/_components/modal";
import PostView from "@/app/_components/posts/PostView";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import useProfile from "@/app/_hooks/useProfile";
import { getPostCount, getUserPosts } from "@/app/_mutations";
import { Post } from "@/app/_schema";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import PageGrid from "./_components/PageGrid";
import ProfileChanger from "./_components/ProfileChanger";
import ProfileImage from "./_components/ProfileImage";

export default function Page({ params }: { params: { username: string } }) {
  const { profile } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const isOwner = params.username === (profile && profile.username);
  const { profile: userProfile, isLoading: profileIsLoading } = useProfile(isOwner, 
    params.username
  );
  const postCount = useQuery({
    queryKey: ["postCount"],
    queryFn: () => getPostCount(params.username),
  });

  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam }) => getUserPosts(pageParam, params.username),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => lastPage.data.nextCursor,
    });

  const observer = useRef<IntersectionObserver>();

  const changeCurrentPost = (post: Post) => {
    setCurrentPost(post);
    setShowModal(true);
  };

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

  return (
    <div className="flex flex-col w-full h-full">
      <div className="max-w-grid-max-width w-full h-full m-auto">
        <header className="flex w-full items-center justify-center border-b p-4 mb-4">
          <div className="mx-[50px]">
            {isOwner ? (
              <ProfileChanger />
            ) : (
              <ProfileImage imageURL={userProfile?.imageURL} />
            )}
          </div>
          <div className="grow">
            <p className="mb-[20px] text-2xl font-bold">{userProfile?.name}</p>
            <p>
              <span className="mr-2 font-bold">
                {postCount.data?.data.count}
              </span>
              posts
            </p>
          </div>
        </header>
        <div className="grid gap-2">
          {data &&
            data.pages.map((page, i) => (
              <PageGrid
                key={i}
                page={page.data.posts}
                addCurrentPost={changeCurrentPost}
              />
            ))}
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} animation="fade-in-scale">
          {currentPost && <PostView post={currentPost} />}
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
