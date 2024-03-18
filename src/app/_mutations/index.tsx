import axios from "axios";

export const getUserPosts = async (pageParam: number, username: string) => {
  return axios.get(`api/${username}/posts?page=${pageParam}`)
}

export const getPostCount = async (username: string) => {
  return axios.get(`api/${username}/posts/count`)
}

export const getUserProfile = async (username: string) => {
  return axios.get(`api/${username}/profile`)
}

export const getOwnerProfile = async () => {
  return axios.get(`api/auth/profile`)
}

export function postProfileImage(formData: FormData) {
  return axios.post(`api/auth/profile`, formData)
}

export function postPosts(formData: FormData) {
  return axios.post(`api/posts`, formData);
}