import { Post } from "@/app/_schema/schema";
import React, { useMemo } from "react";
import { ImageSlider } from "./common";
import { AssortedPost } from "@/app/(pages)/profile/_types";

export default function PostView({ post }: { post: AssortedPost | null }) {
  if (!post) return <div>Something went wrong.</div>;
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center h-view-image-width">
        <div className="w-view-image-width aspect-1 max-h-view-maxHeight">
          <ImageSlider dataURLs={post.Images} />
        </div>
        <div className="w-view-comment-width h-view-image-width bg-white p-2">
          {post.description.length > 0 ? post.description : "No comment yet"}
        </div>
      </div>
    </div>
  );
}
