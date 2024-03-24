import { PostIndex } from "@/app/(pages)/[username]/page";
import { IconType } from "@/app/_assets/Icons";
import emptyProfilePic from "@/app/_assets/static/defaultProfileImage.jpeg";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import { postToggleLikeOnPost } from "@/app/_mutations";
import { Post } from "@/app/_types";
import { getPostDate } from "@/app/_utility/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Icon } from "../common";
import { ImageSlider } from "../images/common";

export default function PostView({
  post,
  postIndex,
}: {
  post: Post;
  postIndex: PostIndex;
}) {
  const [comment, setComment] = useState("");
  const { profile } = useAuthContext();
  const isOwner = post.owner.username === profile?.username;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: postToggleLikeOnPost,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const prevData: any = queryClient.getQueryData(["posts"]);
      const newPages = prevData.pages.map((page: any, i: number) => {
        if (i !== postIndex.pageNum) return page;
        const newPosts = page.data.posts.map((post: Post, i: number) => {
          if (i === postIndex.index) {
            return {
              ...post,
              has_liked: data.hasLiked,
              likes_count: data.hasLiked
                ? post.likes_count + 1
                : post.likes_count - 1,
            };
          }
          return post;
        });
        const newData = { ...page.data, posts: newPosts };
        return { ...page, data: newData };
      });

      const newData = { ...prevData, pages: newPages };
      queryClient.setQueryData(["posts"], newData);
      return { prevData, newData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("Liked successfully");
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["posts"], context?.prevData);
    },
  });
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  const handlePost = () => {};
  if (!post) return <div>Something went wrong.</div>;

  const handleLikeClick = () => {
    mutate({ post_id: post.id, hasLiked: !post.has_liked });
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
                    src={post.owner.imageURL ?? emptyProfilePic}
                    alt="profile image"
                    className="object-cover"
                    fill={true}
                  />
                </div>
                <p className="whitespace-nowrap text-ellipsis">
                  {post.owner.name}
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
              <p className="grow ml-2">
                {post.likes_count > 0
                  ? `${post.likes_count} like${post.likes_count > 1 ? "s" : ""}`
                  : "Be the first to like"}
              </p>
              <button className="shrink-0 justify-self-end">
                <Icon className="w-8 h-8" icon={IconType.Bookmark} />
              </button>
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
