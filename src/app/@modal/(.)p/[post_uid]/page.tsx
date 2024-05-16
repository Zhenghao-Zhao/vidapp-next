"use client";
import Modal from "@/app/_contexts/providers/ModalContextProivder";
import { Post } from "@/app/_types";
import { ModalContent } from "@/app/_ui/modal";
import PostView from "@/app/posts/PostView";
import { useQueries, useQueryClient } from "@tanstack/react-query";

export default function Page({
  params: { post_uid },
}: {
  params: { post_uid: string };
}) {
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryCache();
  const queryKeys = cache
    .getAll()
    .map((c) => c.queryKey)
    .filter((key) => key[0] === "posts" && key[1] === "infinite");

  const results = useQueries({
    queries: queryKeys.map((key) => ({
      queryKey: key,
      enabled: false,
    })),
    combine: (results) =>
      results.flatMap((result) =>
        (result.data as any).pages.flatMap((page: any) => page.posts)
      ),
  });

  const post = findPost(post_uid, results);
  return (
    <Modal defaultOpen={true} rollbackURL={window.location.href}>
      <ModalContent>
        <PostView post={post} />
      </ModalContent>
    </Modal>
  );
}

function findPost(post_uid: string, posts: Post[]): Post {
  const post = posts.find((post) => post.uid === post_uid);
  return post!;
}
