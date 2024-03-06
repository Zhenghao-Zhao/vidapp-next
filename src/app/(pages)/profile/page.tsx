"use client";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import profilePic from "@/app/_assets/static/defaultProfileImage.jpeg";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPostCount, fetchUserPosts } from "@/app/api/queries";
import { Post, PostPage } from "@/app/_schema/schema";
import Spinner from "@/app/_components/loaders/Loaders";
import { Modal } from "@/app/_components/modal/Modal";
import PostView from "@/app/_components/images/PostView";
import { R2_BUCKET_URL_PUBLIC } from "@/app/constants";
import PostEntry from "@/app/_components/images/PostEntry";
import { promise } from "zod";
import { preloadImage, preloadImages } from "@/app/_hooks/usePreloadImages";
import useFetchPosts from "./_hooks/useFetchPosts";
import PageGrid from "./_components/PageGrid";

export type AssortedPost = {
  description: string;
  likes_count: string;
  Images: string[];
};

export type Pages = {
  [key: string | number]: AssortedPost[];
};

export default function Profle() {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<AssortedPost | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<Pages | null>(null);
  const { isLoading, hasNext } = useFetchPosts(currentPage, setPages);

  const postCount = useQuery({
    queryKey: ["postCount"],
    queryFn: fetchPostCount,
  });

  const observer = useRef<IntersectionObserver>();
  // const onOpen = (index: number) => {
  //   setCurrentPost(index);
  //   setShowModal(true);
  // };

  const addCurrentPost = (post: AssortedPost) => {
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
        <div className="w-[150px] h-[150px] shrink-0 relative mx-[150px]">
          <Image
            src={profilePic}
            fill={true}
            alt="Profile image"
            className="w-full h-full"
          />
        </div>
        <div className="grow">
          <p className="mb-[20px] text-2xl font-bold">{user?.email}</p>
          <p>
            <span className="mr-2 font-bold">{postCount.data?.count}</span>
            posts
          </p>
        </div>
      </header>
      <div className="grid gap-2">
        {pages &&
          Object.keys(pages).map((pageNum, i) => (
            <PageGrid
              key={i}
              page={pages[pageNum]}
              addCurrentPost={addCurrentPost}
            />
          ))}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostView post={currentPost} />
        </Modal>
      )}
      <div ref={endOfListRef} className="flex justify-center items-center">
        {hasNext ? (
          <div className="p-2">
            <Spinner size={30} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
