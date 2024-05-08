import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import {
  handleAddComment,
  handleDeletePost,
  handleToggleLike,
} from "@/app/_api/mutations";
import Alert from "@/app/_contexts/providers/AlertContextProvider";
import { useModalContext } from "@/app/_contexts/providers/ModalContextProivder";
import { PostWithPos } from "@/app/_hooks/paginatedFetch/useFetchPosts";
import { IconType } from "@/app/_icons";
import { Post, Profile } from "@/app/_types";
import { AlertContent, AlertTrigger } from "@/app/_ui/alert";
import IconButton from "@/app/_ui/buttons/iconButton";
import Icon from "@/app/_ui/icon";
import { checkPlural, getRelativeDate } from "@/app/_utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useRef, useState } from "react";
import { ImageSlider } from "../_image/images/common";
import DeleteAlert from "../_ui/alert/alerts";
import Spinner, { SpinnerSize } from "../_ui/loaders";
import Comments from "./components/Comments";
import { optAddComment, optDeletePost, optUpdatePaginatedList } from "./utils";

export default function PostView({
  postData,
  queryKey,
  isOwner,
  has_followed,
}: {
  postData: PostWithPos;
  queryKey: string;
  isOwner: boolean;
  has_followed: boolean;
}) {
  const [comment, setComment] = useState("");
  const post = postData.post;
  const queryClient = useQueryClient();
  const ref = useRef<HTMLTextAreaElement>(null);
  const { openModal: showModal } = useModalContext();

  const { mutate: toggleLike } = useMutation({
    mutationFn: handleToggleLike,
    onMutate: async (data) => {
      const prevPost = postData.post;
      const update = {
        has_liked: data.has_liked,
        likes_count: data.has_liked
          ? prevPost.likes_count + 1
          : prevPost.likes_count - 1,
      };
      return await optUpdatePaginatedList<Post>(
        "posts",
        queryClient,
        update,
        queryKey,
        postData.page,
        postData.index
      );
    },
    onError: (error, _variables, context) => {
      console.log(error);
      if (!context) return;
      queryClient.setQueryData(["posts", queryKey], context.prevData);
    },
  });

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: handleDeletePost,
    onSuccess: () => {
      // update user post count
      const prevData = queryClient.getQueryData<Profile>([
        "userProfile",
        queryKey,
      ]);

      if (!prevData) {
        window.location.reload();
        return;
      }

      queryClient.setQueryData(["userProfile", queryKey], {
        ...prevData,
        post_count: prevData.post_count - 1,
      });

      // update posts
      optDeletePost(queryClient, queryKey, postData.page, postData.index);
      showModal(false);
    },
  });

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      handleAddComment(postData.post.uid, formData),
    onSuccess(data) {
      optAddComment(queryClient, data.data, postData.post.uid);
      setComment("");
      ref.current!.style.height = "auto";
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    setComment(e.currentTarget.value);
  };

  const handleDelete = () => {
    deletePost(post.uid);
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
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center h-view-image-width">
        <div className="w-view-image-width aspect-1 max-h-view-maxHeight">
          <ImageSlider dataURLs={post.imageURLs} />
        </div>
        <div className="relative w-view-comment-width h-view-image-width bg-modal-primary">
          <div className="w-full h-full flex flex-col">
            <div className="flex flex-col h-comment-header-height px-4 justify-center shrink-0">
              <div className="flex items-center">
                <div className="mr-4">
                  <ProfileImage
                    imageURL={post.owner.imageURL}
                    twSize="size-12"
                  />
                </div>
                <p className="whitespace-nowrap text-ellipsis">
                  {post.owner.name}
                </p>
                {!isOwner && !has_followed && (
                  <button className="p-2 bg-blue-500 rounded-md text-white ml-auto text-sm">
                    Follow
                  </button>
                )}
                {isOwner &&
                  (isDeleting ? (
                    <div className="relative ml-auto">
                      <Spinner />
                    </div>
                  ) : (
                    <Alert>
                      <AlertTrigger className="ml-auto">
                        <button className="p-2 bg-red-500 rounded-md text-white text-sm">
                          Delete
                        </button>
                      </AlertTrigger>
                      <AlertContent animation="fade-in">
                        <DeleteAlert onConfirm={handleDelete} />
                      </AlertContent>
                    </Alert>
                  ))}
              </div>
            </div>
            <div className="flex flex-col grow overflow-x-hidden scrollbar-none">
              <div className="border-b px-4 pb-2">
                {post.description && <div>{post.description}</div>}
                <p
                  className={`text-xs text-text-secondary ${
                    post.description && "mt-1"
                  }`}
                >
                  {getRelativeDate(post.created_at)}
                </p>
              </div>
              <Comments post_uid={postData.post.uid} />
            </div>
            <div className="flex h-comment-info-height items-center p-2 justify-center border-t shrink-0">
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
              {!isOwner && (
                <button className="shrink-0 justify-self-end">
                  <Icon twSize="w-8" icon={IconType.Bookmark} />
                </button>
              )}
            </div>
            <div className="flex items-center border-t w-full min-h-[41px] shrink-0">
              <textarea
                className="resize-none grow px-2 bg-transparent max-h-comment-input-maxHeight"
                placeholder="Add a comment..."
                onChange={handleChange}
                value={comment}
                rows={1}
                ref={ref}
              />
              <button
                className="h-full mx-2"
                onClick={handlePostComment}
                disabled={isPending}
              >
                {isPending ? <Spinner size={SpinnerSize.SMALL} /> : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommentBox({postData}: {postData: PostWithPos}) {
  
  const [comment, setComment] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      handleAddComment(postData.post.uid, formData),
    onSuccess(data) {
      optAddComment(queryClient, data.data, postData.post.uid);
      setComment("");
      ref.current!.style.height = "auto";
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

  return (
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
        className="h-full mx-2"
        onClick={handlePostComment}
        disabled={isPending}
      >
        {isPending ? <Spinner size={SpinnerSize.SMALL} /> : "Post"}
      </button>
    </div>
  );
}
