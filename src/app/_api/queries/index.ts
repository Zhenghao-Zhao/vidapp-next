import axios from "axios";
import { Friendship, PostPage, Profile } from "../../_types";

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

export const getComments = async (pageParam: number, post_uid: string) => {
  const result = await axios.get(`api/posts/${post_uid}/comments?page=${pageParam}`);
  return result.data;
};

export const getFollowingQueryResult = async (uid: string, query: string) => {
  if (query.length < 1) return null;
  const result = await axios.get(`api/${uid}/following?query=${query}`);
  return result.data;
}

export const getFriends = async (pageParam: number, uid: string, friendship: Friendship) => {
  const url =`api/${uid}/${friendship}?page=${pageParam}` 
  const result = await axios.get(url);
  return result.data;
}

export const getFriendsQueryResult = async (uid: string, friendship: Friendship, query: string) => {
  if (query.length < 1) return null;
  const url =`api/${uid}/${friendship}?query=${query}`
  const result = await axios.get(url);
  return result.data;
}