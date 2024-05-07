"use client";
import InfiniteScrollLoader from "@/app/_common/InfiniteScrollLoader";
import Modal from "@/app/_contexts/providers/ModalContextProivder";
import useFetchPaginatedPosts, {
  PostWithPos,
} from "@/app/_hooks/paginatedFetch/useFetchPaginatedPosts";
import usePageLoader from "@/app/_hooks/usePageLoader";
import { Profile } from "@/app/_types";
import { ModalContent, ModalTrigger } from "@/app/_ui/modal";
import PostEntry from "@/app/posts/PostEntry";
import PostView from "@/app/posts/PostView";
import Image from "next/image";
import emptyFolder from "public/static/emptyFolder.jpeg";
import { useState } from "react";

export default function Body({
  isOwner,
  initialData,
  profile,
}: {
  isOwner: boolean;
  initialData: any;
  profile: Profile;
}) {
  usePageLoader();
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const { posts, isFetching, hasNextPage, fetchNextPage } =
    useFetchPaginatedPosts(profile.uid, 0, initialData);
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
                  queryKey={profile.uid}
                  isOwner={isOwner}
                  has_followed={profile.has_followed}
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
