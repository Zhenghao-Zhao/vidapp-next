import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../_contexts/AuthContextProvider";
import { getUserProfile } from "../_queries";

export default function useProfile(isOwner: boolean, username: string) {
  const { profile } = useAuthContext();
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(username),
    enabled: !isOwner,
  });

  return isOwner
    ? { profile, isLoading: false }
    : { profile: data?.data, isLoading };
}
