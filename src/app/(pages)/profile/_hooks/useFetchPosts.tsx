import { fetchUserPosts } from "@/app/api/queries";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { AssortedPost, Pages } from "../page";
import { Post, PostPage } from "@/app/_schema/schema";
import { R2_BUCKET_URL_PUBLIC } from "@/app/constants";
import { preloadImages } from "@/app/_hooks/usePreloadImages";
import { delay } from "@/app/_utility/helpers";

export default function useFetchPosts(
  page: number,
  setPages: React.Dispatch<React.SetStateAction<Pages | null>>,
) {
  const [posts, setPosts] = useState<AssortedPost[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const { status, data, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchUserPosts(page),
  });
  useEffect(() => {
    if (!data) return;
    setHasNext(data.nextCursor !== null);
    setLoading(true);
    async function processPage() {
      const prePosts: PostPage = data.data;
      const urls: string[] = [];
      const assortedPosts: AssortedPost[] = prePosts.map((post: Post) => {
        return {
          ...post,
          Images: post.Images.map((image) => {
            const url = R2_BUCKET_URL_PUBLIC + "/" + image.filename;
            urls.push(url);
            return url;
          }),
        };
      });
      await Promise.all(preloadImages(urls));
      setPosts(assortedPosts);
      setPages(prev => {return {...prev, [page]: assortedPosts}})
      setLoading(false);
    }
    processPage();
  }, [data, page, setPages]);

  return { isLoading, posts, error, hasNext };
}
