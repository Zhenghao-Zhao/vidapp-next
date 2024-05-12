import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import {
  handleDeletePost
} from "@/app/_api/mutations";
import Alert from "@/app/_contexts/providers/AlertContextProvider";
import { useModalContext } from "@/app/_contexts/providers/ModalContextProivder";
import { Post, Profile } from "@/app/_types";
import { AlertContent, AlertTrigger } from "@/app/_ui/alert";
import { getRelativeDate } from "@/app/_utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageSlider } from "../_image/images/common";
import DeleteAlert from "../_ui/alert/alerts";
import Spinner from "../_ui/loaders";
import Separator from "../_ui/seperator";
import Comments from "./components/Comments";
import PostFooter from "./components/PostFooter";
import { optDeletePost } from "./utils";

export default function PostView({
  post,
}: {
  post: Post;
}) {
  const queryClient = useQueryClient();
  const { openModal: showModal } = useModalContext();
  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: handleDeletePost,
    onSuccess: () => {
      // update user post count
      const prevData = queryClient.getQueryData<Profile>([
        "userProfile",
        post.owner.uid,
      ]);

      if (!prevData) {
        window.location.reload();
        return;
      }

      queryClient.setQueryData(["userProfile", post.owner.uid], {
        ...prevData,
        post_count: prevData.post_count - 1,
      });

      // update posts
      optDeletePost(queryClient, post);
      showModal(false);
    },
  });

  const handleDelete = () => {
    deletePost(post.uid);
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
                {!post.is_owner && !post.owner.has_followed && (
                  <button className="p-2 bg-blue-500 rounded-md text-white ml-auto text-sm">
                    Follow
                  </button>
                )}
                {post.is_owner &&
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
              <Comments post_uid={post.uid} />
            </div>
            <Separator />
            <PostFooter post={post} />
          </div>
        </div>
      </div>
    </div>
  );
}