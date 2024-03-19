import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../_contexts/AuthContextProvider";
import { getUserProfile } from "../_mutations";

export default function useProfile(username: string) {
  const { profile } = useAuthContext();

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(username),
    enabled: (!!profile && username === profile!.username)
  });

  return (!!profile && username === profile!.username)
    ? { profile, isLoading: false }
    : { profile: data?.data.data, isLoading };
}
