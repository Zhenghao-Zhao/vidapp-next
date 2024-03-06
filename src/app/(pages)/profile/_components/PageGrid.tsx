import React, { useState } from "react";
import { AssortedPost } from "../page";
import PostEntry from "@/app/_components/images/PostEntry";

export default function PageGrid({
  page,
  addCurrentPost,
}: {
  page: AssortedPost[];
  addCurrentPost: (p: AssortedPost) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {page.map((post, i) => (
        <PostEntry post={post} key={i} onClick={() => addCurrentPost(post)} />
      ))}
    </div>
  );
}