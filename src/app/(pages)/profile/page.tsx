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
import { fetchUserPosts } from "@/app/api/queries";
import { Post } from "@/app/_schema/schema";
import Spinner from "@/app/_components/loaders/Loaders";
import { Modal } from "@/app/_components/modal/Modal";
import PostView from "@/app/_components/images/PostView";
import { R2_BUCKET_URL_PUBLIC } from "@/app/constants";
import PostEntry from "@/app/_components/images/PostEntry";

export type AssortedPost = {
  description: string;
  likes_count: string;
  Images: string[];
}

export default function Profle() {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(0);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchUserPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });

  const observer = useRef<IntersectionObserver>();

  const posts: AssortedPost[] = useMemo(() => {
    if (!data) return [];
    const flatPages = data.pages.flat();
    const assortedPosts = flatPages.map((post: Post) => {
      return {
        ...post,
        Images: post.Images.map(
          (image) => R2_BUCKET_URL_PUBLIC + "/" + image.filename
        ),
      };
    });
    return assortedPosts;
  }, [data]);

  console.log(data?.pages);

  const onOpen = (index: number) => {
    setCurrentPost(index);
    setShowModal(true);
  };

  const endOfListRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (!hasNextPage || isFetchingNextPage) return;
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });
      observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
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
            <span className="mr-2 font-bold">{data?.pages.flat().length}</span>
            posts
          </p>
        </div>
      </header>
      {posts.length > 0 && (
        <div className="grid gap-3 w-full h-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] mt-4">
          {posts.map((group, i) => (
            <PostEntry post={group} key={i} onOpen={() => onOpen(i)} />
          ))}
        </div>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostView post={posts[currentPost]} />
        </Modal>
      )}
      <div ref={endOfListRef} className="flex justify-center items-center">
        {isFetchingNextPage ? (
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
