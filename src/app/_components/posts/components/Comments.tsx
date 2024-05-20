import ProfileImage from "@/app/(web)/(pages)/[username]/_components/ProfileImage";
import IconButton from "@/app/_components/ui/buttons/iconButton";
import { IconType } from "@/app/_icons";
import useFetchComments, {
  CommentWithPos,
} from "@/app/_libs/hooks/paginatedFetch/useFetchComments";
import { handleToggleLikeComment } from "@/app/_libs/mutries/mutations";
import { type Comment } from "@/app/_libs/types";
import { checkPlural, getRelativeDate } from "@/app/_libs/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ListLoader, SpinnerSize } from "../../ui/loaders";
import { optUpdatePaginatedList } from "../utils";
import { InfiniteScrollLoader } from "../../common";

export default function Comments({ post_uid }: { post_uid: string }) {
  const { comments, fetchNextPage, isFetching, hasNextPage } =
    useFetchComments(post_uid);

  if (!isFetching && comments.length < 1)
    return (
      <div className="grow flex items-center justify-center font-bold text-2xl">
        No comments
      </div>
    );
  return (
    <div className="grow flex flex-col py-2">
      {comments.map((comment, i) => (
        <Comment key={i} commentData={comment} queryKey={post_uid} />
      ))}
      {comments.length > 0 ? (
        <InfiniteScrollLoader
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          fetchNextPage={fetchNextPage}
          loaderSize={SpinnerSize.SMALL}
        />
      ) : (
        <ListLoader />
      )}
    </div>
  );
}

function Comment({
  commentData,
  queryKey,
}: {
  commentData: CommentWithPos;
  queryKey: string;
}) {
  const comment = commentData.comment;
  const queryClient = useQueryClient();
  const { mutate: toggleLike } = useMutation({
    mutationFn: handleToggleLikeComment,
    onMutate: async (data) => {
      const update = {
        has_liked: data.to_like,
        likes_count: data.to_like
          ? comment.likes_count + 1
          : comment.likes_count - 1,
      };
      return await optUpdatePaginatedList<Comment>(
        "comments",
        queryClient,
        update,
        queryKey,
        commentData.page,
        commentData.index
      );
    },
    onError: (error, _variables, context) => {
      console.log(error);
      if (!context) return;
      queryClient.setQueryData(["comments", queryKey], context.prevData);
    },
  });

  const handleLikeClick = (comment_uid: string, to_like: boolean) => {
    toggleLike({ comment_uid, to_like });
  };

  return (
    <div className="flex py-2 px-4">
      <ProfileImage
        imageURL={comment.from_user.imageURL}
        twSize="size-comment-profile-image-size"
      />
      <div className="flex flex-col justify-center pl-4 grow">
        <p className="font-bold w-full">{comment.from_user.name}</p>
        <p className="text-sm text-wrap leading-4 break-words max-w-comment-maxWidth w-full">
          {comment.comment}
        </p>
        <div className="text-xs text-gray-500 mt-1 flex font-bold">
          <p>{getRelativeDate(comment.created_at)}</p>
          <button className="ml-2">
            {comment.likes_count > 0 &&
              checkPlural(comment.likes_count, "like", "likes")}
          </button>
        </div>
      </div>
      <IconButton
        icon={comment.has_liked ? IconType.Heart : IconType.EmptyHeart}
        tip={comment.has_liked ? "Unlike" : "Like"}
        handleClick={() => handleLikeClick(comment.uid, !comment.has_liked)}
        showHighlight={false}
        twSize="size-5"
      />
    </div>
  );
}