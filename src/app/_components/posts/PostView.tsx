import { IconType } from "@/app/_assets/Icons";
import emptyProfilePic from "@/app/_assets/static/defaultProfileImage.jpeg";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import { Post } from "@/app/_types";
import { getPostDate } from "@/app/_utility/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Icon } from "../common";
import { ImageSlider } from "../images/common";
import { postToggleLikeOnPost } from "@/app/_mutations";

export default function PostView({ post }: { post: Post }) {
  const [comment, setComment] = useState("");
  const { profile } = useAuthContext();
  const isOwner = post.profile.username === profile?.username;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => postToggleLikeOnPost(post.id, post.has_liked),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts']})
      console.log("Liked successfully")
    }
  })

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  const handlePost = () => {};
  if (!post) return <div>Something went wrong.</div>;

  const handleLikeClick = () => {
    mutate();
  };

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
            <div className="absolute bottom-comment-footer-height top-comment-header-height left-0 right-0 overflow-y-auto">
              <div className="border-b p-3 pt-2">
                {post.description && <div>{post.description}</div>}
                <p className="text-xs text-gray-500 mt-2">
                  {getPostDate(post.created_at)}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t absolute bottom-0 w-full h-comment-footer-height ">
            <div className="flex h-comment-info-height items-center px-2">
              <button className="shrink-0" onClick={handleLikeClick}>
                <Icon
                  className="w-8 h-8"
                  icon={post.has_liked ? IconType.Heart : IconType.EmptyHeart}
                />
              </button>
              <button className="shrink-0 ml-4">
                <Icon className="w-8 h-8" icon={IconType.Bookmark} />
              </button>
              <p className="grow text-right">
                {post.likes_count > 0
                  ? `${post.likes_count} like${post.likes_count > 1? "s" : ""}`
                  : "Be the first to like"}
              </p>
            </div>
            <div className="flex items-center h-comment-input-height border-t">
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
