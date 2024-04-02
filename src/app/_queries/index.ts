import axios from "axios";
import { PostPage, Profile } from "../_types";

export const getUserPosts = async (pageParam: number, username: string) => {
  const result = await axios.get<PostPage>(
    `api/${username}/posts?page=${pageParam}`
  );
  return result.data;
};

export const getUserProfile = async (username: string) => {
  const result = await axios.get<Profile>(`api/${username}/profile`);
  return result.data;
};
