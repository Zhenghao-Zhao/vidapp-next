import { Post } from "@/app/_types";
import { QueryClient } from "@tanstack/react-query";
import { Comment } from "@/app/_types";

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

export async function optAddComment(
  queryClient: QueryClient,
  comment: Comment,
  queryKey: string
) {
  const prevData: any = queryClient.getQueryData(["comments", queryKey]);
  if (!prevData) {
    window.location.reload();
    return;
  }
  // add new comment to first page
  const firstPage = prevData.pages[0];
  const newPage = {
    ...firstPage,
    comments: [comment, ...firstPage.comments],
  };
  const newPages = prevData.pages.map((page: any, i: number) => {
    return i === 0 ? newPage : page;
  });
  const newData = { ...prevData, pages: newPages };
  queryClient.setQueryData(["comments", queryKey], newData);
}

export async function optUpdatePaginatedList<T>(
  listName: string,
  queryClient: QueryClient,
  update: any,
  queryKey: string,
  pageNum: number,
  index: number
) {
  await queryClient.cancelQueries({ queryKey: [listName, queryKey] });
  const prevData: any = queryClient.getQueryData([listName, queryKey]);
  if (!prevData) {
    window.location.reload();
    return;
  }
  const newPages = prevData.pages.map((prevPage: any, i: number) => {
    if (i !== pageNum) return prevPage;
    const newItems = prevPage[listName].map(
      (prevItem: T, i: number) => {
        if (i === index) {
          return {
            ...prevItem,
            ...update,
          };
        }
        return prevItem;
      }
    );
    return { ...prevPage, [listName]: newItems };
  });
  const newData = { ...prevData, pages: newPages };
  queryClient.setQueryData([listName, queryKey], newData);
  return { prevData, newData };
}
