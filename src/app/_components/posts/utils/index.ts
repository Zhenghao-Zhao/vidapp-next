import { Post } from "@/app/_types";
import { QueryClient } from "@tanstack/react-query";

export async function optUpdatePost(
  queryClient: QueryClient,
  update: any,
  queryKey: string,
  pageNum: number,
  index: number
) {
  await queryClient.cancelQueries({ queryKey: ["posts", queryKey] });
  const prevData: any = queryClient.getQueryData(["posts", queryKey]);

  if (!prevData) {
    window.location.reload();
    return;
  }

  const newPages = prevData.pages.map((prevPage: any, i: number) => {
    if (i !== pageNum) return prevPage;
    const newPosts = prevPage.posts.map((prevPost: Post, i: number) => {
      if (i === index) {
        return {
          ...prevPost,
          ...update,
        };
      }
      return prevPost;
    });
    return { ...prevPage, posts: newPosts };
  });
  const newData = { ...prevData, pages: newPages };
  queryClient.setQueryData(["posts", queryKey], newData);
  return { prevData, newData };
}

export function optDeletePost(
  queryClient: QueryClient,
  queryKey: string,
  pageNum: number,
  index: number
) {
  const prevData: any = queryClient.getQueryData(["posts", queryKey]);

  if (!prevData) {
    window.location.reload();
    return;
  }
  
  const newPages = prevData.pages.map((prevPage: any, i: number) => {
    if (i !== pageNum) return prevPage;
    const newPosts = prevPage.posts.filter((post: Post, i: number) => {
      return i !== index;
    });
    return { ...prevPage, posts: newPosts };
  });
  const newData = { ...prevData, pages: newPages };
  queryClient.setQueryData(["posts", queryKey], newData);
}
