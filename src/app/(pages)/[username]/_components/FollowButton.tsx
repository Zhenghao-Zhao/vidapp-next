import Spinner from "@/app/_components/loaders";
import { handleToggleFollow } from "@/app/_mutations";
import { Profile } from "@/app/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function FollowButton({
  has_followed,
  username,
}: {
  has_followed: boolean;
  username: string;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleToggleFollow,
    onSuccess: async () => {
      const prevData = queryClient.getQueryData<Profile>([
        "userProfile",
        username,
      ]);
      if (!prevData) {
        window.location.reload();
        return;
      }
      queryClient.setQueryData(["userProfile", username], {
        ...prevData,
        has_followed: !prevData.has_followed,
        follower_count: prevData.has_followed
          ? prevData.follower_count - 1
          : prevData.follower_count + 1,
      });
    },
  });
 
  const handleClick = () => {
    mutate({ username, has_followed: !has_followed });
  };
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : has_followed ? "Unfollow" : "Follow"}
    </button>
  );
}
