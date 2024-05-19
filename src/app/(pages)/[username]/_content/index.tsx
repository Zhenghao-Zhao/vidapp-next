"use client";
import usePageOnLoad from "@/app/_libs/_hooks/usePageOnLoad";
import { getUserProfile } from "@/app/_libs/_mutries/queries";
import { useQuery } from "@tanstack/react-query";
import Body from "../_body";
import Header from "../_header";
import { InitData } from "../page";

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
