"use client";
import usePageOnLoad from "@/app/_libs/hooks/usePageOnLoad";
import { getUserProfile } from "@/app/_libs/mutries/queries";
import { useQuery } from "@tanstack/react-query";
import { InitData } from "../page";
import Body from "./body";
import Header from "./header";

export default function Content({ initData }: { initData: InitData }) {
  usePageOnLoad();
  const { profile, isOwner, postData } = initData;
  const { data: userData } = useQuery({
    queryKey: ["userProfile", profile.uid],
    queryFn: () => getUserProfile(profile.username),
    staleTime: 1000 * 60 * 60 * 8,
    initialData: profile,
    retry: 1,
  });

  return (
    <div className="max-w-grid-maxWidth flex flex-col grow">
      <Header profile={userData} isOwner={isOwner} />
      <Body profile={userData} initialData={postData} />
    </div>
  );
}
