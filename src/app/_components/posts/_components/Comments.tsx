import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import useFetchComments from "@/app/_hooks/useFetchPaginatedComments";
import { CommentLoader } from "../../loaders";

export default function Comments({ post_uid }: { post_uid: string }) {
  const { comments, fetchNextPage, isFetching } = useFetchComments(post_uid);
  if (isFetching) return <CommentLoader />;
  
  if (comments.length < 1)
    return (
      <div className="grow flex items-center justify-center font-bold text-2xl">No comments</div>
    );
  return (
    <div className="flex flex-col">
      {comments.map((comment, i) => {
        return <div key={i} className="flex p-2">
          <ProfileImage imageURL={comment.imageURL} twSize="size-comment-profile-image-size" />
          <div className="flex flex-col justify-center pl-4">
            <p className="font-bold">{comment.name}</p>
            <p className="text-sm text-wrap leading-4 break-words w-comment-width">{comment.comment}</p>
          </div>
        </div>;
      })}
    </div>
  );
}
