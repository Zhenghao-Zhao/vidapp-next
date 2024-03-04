import { Post } from "@/app/_schema/schema";
import React, { useMemo } from "react";
import { ImageSlider } from "./common";
import { AssortedPost } from "@/app/(pages)/profile/page";

export default function PostView({ post }: { post: AssortedPost }) {

  return (
    <div className="w-[600px] h-[600px]">
      <ImageSlider dataURLs={post.Images} />
    </div>
  );
}
