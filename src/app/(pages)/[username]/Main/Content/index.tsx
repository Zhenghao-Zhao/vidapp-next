"use client";
import emptyFolder from "@/app/_assets/static/emptyFolder.jpeg";
import InfiniteScrollLoader from "@/app/_components/common/InfiniteScrollLoader";
import { ModalContent, ModalTrigger } from "@/app/_components/modal";
import PostEntry from "@/app/_components/posts/PostEntry";
import PostView from "@/app/_components/posts/PostView";
import Modal from "@/app/_contexts/providers/ModalContextProivder";
import useFetchPaginatedPosts, {
  PostWithPos,
} from "@/app/_hooks/pagination/useFetchPaginatedPosts";
import usePageLoader from "@/app/_hooks/usePageLoader";
import Image from "next/image";
import { useState } from "react";

export default function Content({
  uid,
  isOwner,
  initialData,
}: {
  uid: string;
  isOwner: boolean;
  initialData: any;
}) {
  usePageLoader();
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const { posts, isFetching, hasNextPage, fetchNextPage } =
    useFetchPaginatedPosts(uid, 0, initialData);
  return (
    <div>
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
            <Modal key={j}>
              <ModalTrigger>
                <PostEntry
                  post={post.post}
                  onClick={() => {
                    setCurrentPostIndex(j);
                  }}
                />
              </ModalTrigger>
              <ModalContent animation="fade-in-scale">
                <PostView
                  postData={posts[currentPostIndex]}
                  queryKey={uid}
                  isOwner={isOwner}
                />
              </ModalContent>
            </Modal>
          );
        })}
      </div>
      <div className="h-16 flex justify-center items-center">
        <InfiniteScrollLoader
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </div>
  );
}
