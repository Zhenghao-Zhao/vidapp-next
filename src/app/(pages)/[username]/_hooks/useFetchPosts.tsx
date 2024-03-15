import { getUserPosts } from "@/app/_mutations";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Post, PostPage } from "@/app/_schema";
import { preloadImages } from "@/app/_hooks/usePreloadImages";
import { Pages } from "../_types";

export default function useFetchPosts(
  page: number,
  username: string,
  setPages: React.Dispatch<React.SetStateAction<Pages | null>>
) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const { data, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getUserPosts(page, username),
  });
  useEffect(() => {
    if (!data) return;
    setHasNext(data.data.nextCursor !== null);
    setLoading(true);
    async function processPage() {
      if (!data) return;
      const posts: PostPage = data.data.posts;
      const urls: string[] = [];
      posts.forEach((post) => post.imageURLs.forEach((url) => urls.push(url)));

      await Promise.all(preloadImages(urls));
      setPosts(posts);
      setPages((prev) => {
        return { ...prev, [page]: posts };
      });
      setLoading(false);
    }
    processPage();
  }, [data, page, setPages]);

  return { isLoading, posts, error, hasNext };
}
