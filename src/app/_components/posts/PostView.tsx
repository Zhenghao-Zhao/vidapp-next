import { Post } from "@/app/_schema";
import React, { ChangeEvent, useMemo, useState } from "react";
import { ImageSlider } from "../images/common";
import { AssortedPost } from "@/app/(pages)/[username]/_types";

export default function PostView({ post }: { post: AssortedPost | null }) {
  const [comment, setComment] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value)
  }

  const handlePost = () => {

  }
  if (!post) return <div>Something went wrong.</div>;
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center h-view-image-width">
        <div className="w-view-image-width aspect-1 max-h-view-maxHeight">
          <ImageSlider dataURLs={post.Images} />
        </div>
        <div className="w-view-comment-width h-view-image-width bg-white relative">
          <div className="p-2">
            {post.description.length > 0 ? post.description : "No comment yet"}
          </div>
          <div className="border-t absolute bottom-0 w-full bg-green-200 p-2">
            <div className="flex items-center">
              <textarea
                className="resize-none grow p-2"
                placeholder="Add a comment..."
                onChange={handleChange}
                value={comment}
                rows={1}
              />
              <button className="mx-2" onClick={handlePost}>Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}