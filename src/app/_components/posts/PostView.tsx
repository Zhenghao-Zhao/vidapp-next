import emptyProfilePic from "@/app/_assets/static/defaultProfileImage.jpeg";
import { Post, Profile } from "@/app/_schema";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { ImageSlider } from "../images/common";

export default function PostView({
  post,
}: {
  post: Post | null;
}) {
  const [comment, setComment] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };
  const handlePost = () => {};
  if (!post) return <div>Something went wrong.</div>;
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center h-view-image-width">
        <div className="w-view-image-width aspect-1 max-h-view-maxHeight">
          <ImageSlider dataURLs={post.imageURLs} />
        </div>
        <div className="w-view-comment-width h-view-image-width bg-white relative">
          <div>
            <div className="flex flex-col p-4 border-b">
              <div className="flex items-center">
                <div className="size-12 relative rounded-full overflow-hidden mr-6">
                  <Image
                    src={post.profile.imageURL ?? emptyProfilePic}
                    alt="profile image"
                    className="object-cover"
                    fill={true}
                  />
                </div>
                <p className="whitespace-nowrap text-ellipsis">
                  {post.profile.name}
                </p>
              </div>
              {post.description && (
                <div className="bg-red-100 mt-5">{post.description}</div>
              )}
            </div>
          </div>
          <div className="border-t absolute bottom-0 w-full bg-green-200 p-2">
            <div></div>
            <div className="flex items-center">
              <textarea
                className="resize-none grow p-2"
                placeholder="Add a comment..."
                onChange={handleChange}
                value={comment}
                rows={1}
              />
              <button className="mx-2" onClick={handlePost}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
