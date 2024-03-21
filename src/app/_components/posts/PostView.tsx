import emptyProfilePic from "@/app/_assets/static/defaultProfileImage.jpeg";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import { Post } from "@/app/_schema";
import { getPostDate } from "@/app/_utility/helpers";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { ImageSlider } from "../images/common";

export default function PostView({ post }: { post: Post }) {
  const [comment, setComment] = useState("");
  const { profile } = useAuthContext();
  const isOwner = post.profile.username === profile?.username;

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
            <div className="flex flex-col h-comment-header-height p-2 justify-center">
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
                {!isOwner && (
                  <button className="p-2 bg-blue-500 rounded-md text-white ml-auto text-sm">
                    Follow
                  </button>
                )}
              </div>
            </div>
            <div className="absolute bottom-comment-input-height top-comment-header-height left-0 right-0 overflow-y-auto">
              <div className="border-b p-3 pt-2">
                {post.description && (
                  <div>{post.description}</div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {getPostDate(post.created_at)}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t absolute bottom-0 w-full h-comment-input-height ">
            <div className="flex items-center h-full">
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
