import Spinner from "@/app/_components/_ui/loaders";
import { useDataContext } from "@/app/_libs/_contexts/providers/ServerContextProvider";
import { handleToggleFollow } from "@/app/_libs/_mutries/mutations";
import { Profile } from "@/app/_libs/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function FollowButton({
  has_followed,
  to_uid,
}: {
  has_followed: boolean;
  to_uid: string;
}) {
  const queryClient = useQueryClient();
  const { data: serverData } = useDataContext();
  const [isFollowing, setIsFollowing] = useState(has_followed);
  const from_uid = serverData!.profile.uid;
  const { mutate, isPending } = useMutation({
    mutationFn: handleToggleFollow,
    onSuccess: async (data) => {
      const has_followed = data.data.has_followed;
      const from_prevData = queryClient.getQueryData<Profile>([
        "userProfile",
        from_uid,
      ]);
      const to_prevData = queryClient.getQueryData<Profile>([
        "userProfile",
        to_uid,
      ]);
      
      if (from_prevData) {
        const from_followingCount =
          from_prevData.following_count + (has_followed? 1 : -1);

        queryClient.setQueryData(["userProfile", from_uid], {
          ...from_prevData,
          following_count: from_followingCount,
        });
      }

      if (to_prevData) {
        const to_followerCount =
          to_prevData.follower_count + (has_followed? 1 : -1);
  
        queryClient.setQueryData(["userProfile", to_uid], {
          ...to_prevData,
          follower_count: to_followerCount,
          has_followed,
        });
      }

      setIsFollowing((prev) => !prev);
    },
  });
  const handleClick = () => {
    mutate({ uid: to_uid, to_follow: !isFollowing });
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
