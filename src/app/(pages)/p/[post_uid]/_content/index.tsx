"use client";
import { SpacedCarousel } from "@/app/_components/posts/components/Carousel";
import { getPost } from "@/app/_libs/mutries/queries";
import { Post } from "@/app/_libs/types";
import { useQuery } from "@tanstack/react-query";

export default function Content({ initData }: { initData: Post }) {
  const { data } = useQuery({
    queryKey: ["posts", initData.uid],
    queryFn: () => getPost(initData.uid),
    initialData: initData,
  });
  return (
    <div className="w-full flex justify-center">
      <div className="w-full h-[400px]">
        <SpacedCarousel dataURLs={data.imageURLs} />
      </div>
    </div>
  );
}
