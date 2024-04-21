import Spinner from "@/app/_components/loaders";
import { useDataContext } from "@/app/_contexts/providers/DataContextProvider";
import { handleToggleFollow } from "@/app/_mutations";
import { Profile } from "@/app/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function FollowButton({
  has_followed,
  uid,
  following_uid,
}: {
  has_followed: boolean;
  uid: string;
  following_uid: string;
}) {
  const queryClient = useQueryClient();
  const { data: serverData } = useDataContext();
  const [isFollowing, setIsFollowing] = useState(has_followed);
  const { mutate, isPending } = useMutation({
    mutationFn: handleToggleFollow,
    onSuccess: async () => {
      const prevData = queryClient.getQueryData<Profile>(["userProfile", uid]);
      if (!prevData) {
        window.location.reload();
        return;
      }

      // follower count: 
      // check if the current page is the page you followed/unfollowed
      // if so update its follower count.
      // following count:
      // check if current page is the user's page, 
      // if so update its following count
      const follower_count =
        uid === following_uid
          ? prevData.has_followed
            ? prevData.follower_count - 1
            : prevData.follower_count + 1
          : prevData.follower_count;

      const following_count =
        serverData!.profile.uid === uid
          ? isFollowing
            ? prevData.following_count - 1
            : prevData.following_count + 1
          : prevData.following_count;
      
      const hasFollowed = uid === following_uid? !isFollowing : prevData.has_followed;
      queryClient.setQueryData(["userProfile", uid], {
        ...prevData,
        has_followed: hasFollowed,
        follower_count,
        following_count,
      });
      setIsFollowing(prev => !prev);
    },
  });
  const handleClick = () => {
    mutate({ uid: following_uid, has_followed: !isFollowing });
  };
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : isFollowing ? "Following" : "Follow"}
    </button>
  );
}
