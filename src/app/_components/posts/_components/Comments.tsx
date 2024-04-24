import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import useFetchComments from "@/app/_hooks/pagination/useFetchPaginatedComments";
import { getRelativeDate } from "@/app/_utils";
import InfiniteScrollLoader from "../../../_common/InfiniteScrollLoader";
import { ListLoader, SpinnerSize } from "../../loaders";

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
      {comments.map((comment, i) => {
        return (
          <div key={i} className="flex py-2 px-4">
            <ProfileImage
              imageURL={comment.from_user.imageURL}
              twSize="size-comment-profile-image-size"
            />
            <div className="flex flex-col justify-center pl-4 grow">
              <p className="font-bold w-full">{comment.from_user.name}</p>
              <p className="text-sm text-wrap leading-4 break-words max-w-comment-maxWidth w-full">
                {comment.comment}
              </p>
              <p className="text-xs text-gray-500 mt-1">{getRelativeDate(comment.created_at)}</p>
            </div>
          </div>
        );
      })}
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
