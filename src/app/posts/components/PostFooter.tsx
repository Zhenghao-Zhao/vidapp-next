import { handleAddComment, handleToggleLike } from "@/app/_api/mutations";
import { IconType } from "@/app/_icons";
import { Post } from "@/app/_types";
import IconButton from "@/app/_ui/buttons/iconButton";
import Spinner, { SpinnerSize } from "@/app/_ui/loaders";
import { checkPlural } from "@/app/_utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useRef, useState } from "react";
import { optAddComment, updatePosts } from "../utils";

export default function PostFooter({ post }: { post: Post }) {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const { mutate: toggleLike } = useMutation({
    mutationFn: handleToggleLike,
    onMutate: async (data) => {
      const prevPost = post;
      const update = {
        has_liked: data.has_liked,
        likes_count: data.has_liked
          ? prevPost.likes_count + 1
          : prevPost.likes_count - 1,
      };
      return await updatePosts(queryClient, update, post.uid);
    },
    onError: (error, _variables, context) => {
      console.log(error);
      if (!context) return;
      queryClient.setQueriesData({ queryKey: ["posts"] }, context.prevData);
    },
  });

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: (formData: FormData) => handleAddComment(post.uid, formData),
    onSuccess(data) {
      optAddComment(queryClient, data.data, post.uid);
      setComment("");
      ref.current!.style.height = "auto";
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    setComment(e.currentTarget.value);
  };

  const handlePostComment = () => {
    if (comment.length < 1) return;
    const formData = new FormData();
    formData.append("comment", comment);
    addComment(formData);
  };

  const handleLikeClick = () => {
    toggleLike({ post_uid: post.uid, has_liked: !post.has_liked });
  };

  return (
    <>
      <div className="flex h-comment-info-height items-center px-2 justify-center shrink-0">
        <IconButton
          icon={post.has_liked ? IconType.Heart : IconType.EmptyHeart}
          tip={post.has_liked ? "Unlike" : "Like"}
          handleClick={handleLikeClick}
          showHighlight={false}
        />
        <p className="grow ml-2">
          {post.likes_count > 0
            ? checkPlural(post.likes_count, "like", "likes")
            : "Be the first to like this"}
        </p>
      </div>
      <div className="flex items-center border-t w-full shrink-0 py-2">
        <textarea
          className="resize-none grow px-2 max-h-comment-input-maxHeight bg-transparent"
          placeholder="Add a comment..."
          onChange={handleChange}
          value={comment}
          rows={1}
          ref={ref}
        />
        <button
          className="h-[30px] mx-2"
          onClick={handlePostComment}
          disabled={isPending}
        >
          {isPending ? <Spinner size={SpinnerSize.SMALL} /> : "Post"}
        </button>
      </div>
    </>
  );
}