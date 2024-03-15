"use client";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import Image from "next/image";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getPostCount,
  getUserProfile,
  postProfileImage,
} from "@/app/_mutations";
import Spinner, { SpinnerSize } from "@/app/_components/loaders";
import { Modal } from "@/app/_components/modal";
import PostView from "@/app/_components/posts/PostView";
import useFetchPosts from "./_hooks/useFetchPosts";
import PageGrid from "./_components/PageGrid";
import { Pages } from "./_types";
import ProfileImage from "./_components/ProfileImage";
import ProfileChanger from "./_components/ProfileChanger";
import { Post } from "@/app/_schema";
import useProfile from "@/app/_hooks/useProfile";

export default function Profile({ params }: { params: { username: string } }) {
  const { profile } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<Pages | null>(null);
  const isOwner = params.username === (profile && profile.username);
  const { profile: userProfile, isLoading: profileIsLoading } = useProfile(params.username)
  const { isLoading, hasNext } = useFetchPosts(
    currentPage,
    params.username,
    setPages
  );
  const postCount = useQuery({
    queryKey: ["postCount"],
    queryFn: () => getPostCount(params.username),
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
        if (isLoading || !hasNext) return;
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => prev + 1);
        }
      });
      observer.current.observe(node);
    },
    [isLoading, hasNext]
  );

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <header className="flex w-full items-center justify-center border-b p-4">
        <div className="mx-[50px]">{isOwner ? <ProfileChanger /> : <ProfileImage />}</div>
        <div className="grow">
          <p className="mb-[20px] text-2xl font-bold">{userProfile?.name}</p>
          <p>
            <span className="mr-2 font-bold">{postCount.data?.data.count}</span>
            posts
          </p>
        </div>
      </header>
      <div className="grid gap-2 mt-5">
        {pages &&
          Object.keys(pages).map((pageNum, i) => (
            <PageGrid
              key={i}
              page={pages[pageNum]}
              addCurrentPost={changeCurrentPost}
            />
          ))}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} animation="fade-in-scale">
          <PostView post={currentPost} />
        </Modal>
      )}
      <div className="h-16 flex justify-center items-center">
        {(hasNext || isLoading) && (
          <div ref={endOfListRef}>
            <Spinner size={SpinnerSize.MEDIUM} />
          </div>
        )}
      </div>
    </div>
  );
}
