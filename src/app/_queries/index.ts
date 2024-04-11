import axios from "axios";
import { PostPage, Profile } from "../_types";

export const getUserPosts = async (pageParam: number, uid: string) => {
  const result = await axios.get<PostPage>(
    `api/${uid}/posts?page=${pageParam}`
  );
  return result.data;
};

export const getUserProfile = async (uid: string) => {
  const result = await axios.get<Profile>(`api/${uid}/profile`);
  return result.data;
};

export const getFollowers = async (uid: string) => {
  const result = await axios.get(`api/${uid}/followers`);
  return result.data;
};

export const getFollowing = async (uid: string) => {
  const result = await axios.get(`api/${uid}/following`);
  return result.data;
};

export const getComments = async (pageParam: number, post_uid: string) => {
  const result = await axios.get(`api/posts/${post_uid}/comments?page=${pageParam}`);
  return result.data;
};
