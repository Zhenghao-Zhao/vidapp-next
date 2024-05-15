"use client";
import { getPost } from "@/app/_api/queries";
import { Post } from "@/app/_types";
import PostView from "@/app/posts/PostView";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Container({ initData }: { initData: Post }) {
  const { data } = useQuery({
    queryKey: ["posts", initData.uid],
    queryFn: () => getPost(initData.uid),
    initialData: initData
  });
  return <PostView post={data} />;
}
