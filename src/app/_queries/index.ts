import axios from "axios"
import { PostPage, Profile } from "../_types"

export const getUserPosts = async (pageParam: number, username: string) => {
  return axios.get<PostPage>(`api/${username}/posts?page=${pageParam}`)
}

export const getUserProfile = async (username: string) => {
  return axios.get<Profile>(`api/${username}/profile`)
}