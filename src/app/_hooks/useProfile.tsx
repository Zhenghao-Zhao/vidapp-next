import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../_contexts/AuthContextProvider";
import { getUserProfile } from "../_queries";
import { notFound } from "next/navigation";

export default function useProfile(isOwner: boolean, username: string) {
  const { profile } = useAuthContext();
  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(username),
    enabled: !isOwner,
    staleTime: 1000 * 60 * 60 * 8,
    retry: false,
  });
  if (error) notFound();
  return isOwner
    ? { profile, isLoading: false , error: null}
    : { profile: data?.data, isLoading, error };
}
