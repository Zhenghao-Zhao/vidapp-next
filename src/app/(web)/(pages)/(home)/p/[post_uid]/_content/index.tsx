"use client";
import PostView from "@/app/_components/posts/PostView";
import { getPost } from "@/app/_libs/mutries/queries";
import { Post } from "@/app/_libs/types";
import { useQuery } from "@tanstack/react-query";

export default function Content({ initData }: { initData: Post }) {
  const { data } = useQuery({
    queryKey: ["posts", initData.uid],
    queryFn: () => getPost(initData.uid),
    initialData: initData
  });
  return <PostView post={data} />;
}
