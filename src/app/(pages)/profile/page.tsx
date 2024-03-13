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
import emptyProfilePic from "@/app/_assets/static/defaultProfileImage.jpeg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPostCount, postProfileImage } from "@/app/_helpers";
import Spinner, { SpinnerSize } from "@/app/_components/loaders";
import { Modal } from "@/app/_components/modal";
import PostView from "@/app/_components/posts/PostView";
import useFetchPosts from "./_hooks/useFetchPosts";
import PageGrid from "./_components/PageGrid";
import { AssortedPost, Pages } from "./_types";
import {
  ACCEPTED_UPLOAD_FILE_TYPE,
  CanvasData,
  initFilterValues,
} from "@/app/_components/createPost/uploadSteps/constants";
import { loadImage } from "@/app/_components/createPost/uploadSteps/drop";
import useWorker from "@/app/_hooks/useWorker";

export default function Profle() {
  const { profile, refetch } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<AssortedPost | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<Pages | null>(null);
  const { isLoading, hasNext } = useFetchPosts(currentPage, setPages);
  const [blob, setBlob] = useState<Blob | null>(null);
  const worker = useWorker((event: MessageEvent<any>) =>
    setBlob(event.data[0])
  );
  const postCount = useQuery({
    queryKey: ["postCount"],
    queryFn: fetchPostCount,
  });

  const {
    mutate,
    isPending: isUploadPending,
    error,
  } = useMutation({
    mutationFn: (formData: FormData) => postProfileImage(formData),
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      console.log(error?.message);
    },
  });

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!blob || !profile) return;
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("profile_image_id", profile.profile_image_id + "");
    mutate(formData);
  }, [blob]);

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

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || !profile || !worker) return;
    const file = e.currentTarget.files[0];
    const image: HTMLImageElement = await loadImage(file);
    const canvasData: CanvasData = {
      sx: 0,
      sy: 0,
      sWidth: image.naturalWidth,
      sHeight: image.naturalHeight,
      dx: 0,
      dy: 0,
      dWidth: image.naturalWidth,
      dHeight: image.naturalHeight,
      styleSize: 150,
      filter: initFilterValues,
    };
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const offscreen = canvas.transferControlToOffscreen();
    worker.postMessage(
      { canvas: offscreen, blobs: [file], canvasData: [canvasData] },
      [offscreen]
    );
  };

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <header className="flex w-full items-center justify-center border-b p-4">
        <form>
          <div className="w-[150px] h-[150px] shrink-0 relative mx-[150px] rounded-full overflow-hidden">
            <label htmlFor="profileUpload">
              <Image
                src={profile?.profileImage ?? emptyProfilePic}
                fill={true}
                alt="Profile image"
                className="w-full h-full object-cover hover:cursor-pointer"
              />
            </label>
            {isUploadPending && (
              <div className="absolute w-full h-full bg-white opacity-50 flex items-center justify-center">
                <Spinner size={SpinnerSize.MEDIUM} />
              </div>
            )}
          </div>
          <input
            accept={ACCEPTED_UPLOAD_FILE_TYPE}
            id="profileUpload"
            type="file"
            onChange={handleChange}
            hidden
          />
        </form>
        <div className="grow">
          <p className="mb-[20px] text-2xl font-bold">{profile?.username}</p>
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
              addCurrentPost={addCurrentPost}
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
