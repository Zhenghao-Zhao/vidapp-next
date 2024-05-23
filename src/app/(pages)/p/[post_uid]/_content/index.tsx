"use client";
import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import { PostOptions } from "@/app/_components/posts/PostView";
import { ImageSlider, SpacedCarousel } from "@/app/_components/posts/components/Carousel";
import Comments from "@/app/_components/posts/components/Comments";
import Separator from "@/app/_components/ui/seperator";
import { getPost } from "@/app/_libs/mutries/queries";
import { Post } from "@/app/_libs/types";
import { getRelativeDate } from "@/app/_libs/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-transition-progress/next";

export default function Content({ initData }: { initData: Post }) {
  const { data: post } = useQuery({
    queryKey: ["posts", initData.uid],
    queryFn: () => getPost(initData.uid),
    initialData: initData,
  });
  return (
    <div className="w-full flex flex-col max-w-grid-maxWidth">
      <div className="w-full flex items-center pt-4 px-carousel-arrow-width">
        <div className="pl-2 flex flex-col gap-2 justify-center p-4">
          <div className="flex items-center gap-4">
            <Link href={post.owner.bioURL}>
              <ProfileImage imageURL={post.owner.imageURL} twSize="size-12" />
            </Link>
            <Link href={post.owner.bioURL}>
              <p className="whitespace-nowrap text-ellipsis">
                {post.owner.name}
              </p>
            </Link>
            {!post.is_owner && !post.owner.has_followed && (
              <button className="p-2 bg-blue-500 rounded-md text-white text-sm">
                Follow
              </button>
            )}
          </div>
          {post.description && (
            <p className="flex items-center">{post.description}</p>
          )}
          <p className="text-xs text-text-secondary">
            {getRelativeDate(post.created_at)}
          </p>
        </div>
      </div>
      <div className="w-full h-carousel-image-size">
        <SpacedCarousel dataURLs={post.imageURLs} />
      </div>
      <div className="px-carousel-arrow-width">
        <Separator className="mt-6" />
        <div className="w-full">
          <PostOptions post={post} />
        </div>
        <Separator />
        <div className="w-full grow flex">
          {/* <p>Comments:</p> */}
          <Comments post_uid={post.uid} />
        </div>
      </div>
    </div>
  );
}
