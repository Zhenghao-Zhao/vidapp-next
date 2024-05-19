"use client";
import PostView from "@/app/_components/_posts/PostView";
import { getPost } from "@/app/_libs/_mutries/queries";
import { Post } from "@/app/_libs/_types";
import { useQuery } from "@tanstack/react-query";

export default function Container({ initData }: { initData: Post }) {
  const { data } = useQuery({
    queryKey: ["posts", initData.uid],
    queryFn: () => getPost(initData.uid),
    initialData: initData
  });
  return <PostView post={data} />;
}
