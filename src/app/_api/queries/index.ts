import api from "@/app/config";
import { Friendship, Post, PostPage, Profile } from "../../_types";

export const getUserPosts = async (pageParam: number, uid: string) => {
  const result = await api.get<PostPage>(
    `api/${uid}/posts?page=${pageParam}`
  );
  return result.data;
};

export const getUserProfile = async (uid: string) => {
  const result = await api.get<Profile>(`api/${uid}/profile`);
  return result.data;
};

export const getComments = async (pageParam: number, post_uid: string) => {
  const result = await api.get(
    `api/posts/${post_uid}/comments?page=${pageParam}`
  );
  return result.data;
};

export const getFollowingQueryResult = async (uid: string, query: string) => {
  if (query.length < 1) return null;
  const result = await api.get(`api/${uid}/following?query=${query}`);
  return result.data;
};

export const getFriends = async (
  pageParam: number,
  uid: string,
  friendship: Friendship
) => {
  const url = `api/${uid}/${friendship}?page=${pageParam}`;
  const result = await api.get(url);
  return result.data;
};

export const getFriendsQueryResult = async (
  uid: string,
  friendship: Friendship,
  query: string
) => {
  if (query.length < 1) return null;
  const url = `api/${uid}/${friendship}?query=${query}`;
  const result = await api.get(url);
  return result.data;
};

export const getFollowingPosts = async (pageParam: number) => {
   const result = await api.get<PostPage>(
    `api/following?page=${pageParam}`
  );
  return result.data;
};

export const getPost = async (post_uid: string) => {
  const result = await api.get<Post>(`posts/${post_uid}`);
  return result.data;
}
