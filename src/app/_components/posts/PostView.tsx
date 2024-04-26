import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import { IconType } from "@/app/_assets/Icons";
import Modal, {
  useModalContext,
} from "@/app/_contexts/providers/ModalContextProivder";
import { PostWithPos } from "@/app/_hooks/pagination/useFetchPaginatedPosts";
import {
  handleAddComment,
  handleDeletePost,
  handleToggleLike,
} from "@/app/_mutations";
import { Profile } from "@/app/_types";
import Icon from "@/app/_ui/icon";
import { getRelativeDate } from "@/app/_utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import Spinner from "../../_ui/loaders";
import { ModalContent, ModalTrigger } from "../../_ui/modal";
import DeleteAlert from "../alerts";
import { ImageSlider } from "../images/common";
import Comments from "./_components/Comments";
import { optAddComment, optDeletePost, optUpdatePost } from "./utils";
import IconButton from "@/app/_ui/buttons/IconButton";

export default function PostView({
  postData,
  queryKey,
  isOwner,
}: {
  postData: PostWithPos;
  queryKey: string;
  isOwner: boolean;
}) {
  const [comment, setComment] = useState("");
  const post = postData.post;
  const queryClient = useQueryClient();
  const { setShow } = useModalContext();

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
      return await optUpdatePost(
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
      setShow(false);
    },
  });

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      handleAddComment(postData.post.uid, formData),
    onSuccess(data) {
      optAddComment(queryClient, data.data, postData.post.uid);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  const handleDelete = () => {
    deletePost(post.uid);
  };

  const handleCommentClick = () => {
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
        <div className="w-view-comment-width h-view-image-width bg-modal-primary relative">
          <div className="w-full">
            <div className="flex flex-col h-comment-header-height px-4 justify-center">
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
                {!isOwner && (
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
                    <Modal>
                      <ModalTrigger className="ml-auto">
                        <button className="p-2 bg-red-500 rounded-md text-white text-sm">
                          Delete
                        </button>
                      </ModalTrigger>
                      <ModalContent animation="fade-in">
                        <DeleteAlert onConfirm={handleDelete} />
                      </ModalContent>
                    </Modal>
                  ))}
              </div>
            </div>
            <div className="absolute flex flex-col bottom-comment-footer-height top-comment-header-height left-0 right-0 overflow-x-hidden scrollbar-none">
              <div className="border-b px-4 pb-2">
                {post.description && <div>{post.description}</div>}
                <p
                  className={`text-xs text-gray-500 ${
                    post.description && "mt-1"
                  }`}
                >
                  {getRelativeDate(post.created_at)}
                </p>
              </div>
              <Comments post_uid={postData.post.uid} />
            </div>
          </div>
          <div className="border-t absolute bottom-0 w-full h-comment-footer-height ">
            <div className="flex h-comment-info-height items-center px-2 justify-center">
              <IconButton
                icon={post.has_liked ? IconType.Heart : IconType.EmptyHeart}
                tip={post.has_liked ? "Unlike" : "Like"}
                handleClick={handleLikeClick}
                showHighlight={false}
              />
              <p className="grow ml-2">
                {post.likes_count > 0
                  ? `${post.likes_count} like${post.likes_count > 1 ? "s" : ""}`
                  : "Be the first to like this"}
              </p>
              {!isOwner && (
                <button className="shrink-0 justify-self-end">
                  <Icon twWidth="w-8" icon={IconType.Bookmark} />
                </button>
              )}
            </div>
            <div className="flex items-center h-comment-input-height border-t">
              <textarea
                className="resize-none grow p-2 bg-modal-primary"
                placeholder="Add a comment..."
                onChange={handleChange}
                value={comment}
                rows={1}
              />
              <button
                className="mx-2"
                onClick={handleCommentClick}
                disabled={isPending}
              >
                {isPending ? <Spinner size={20} /> : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
