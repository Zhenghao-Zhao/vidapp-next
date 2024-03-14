import axios from "axios";

export const fetchUserPosts = async (pageParam: number, username: string) => {
  return axios.get(`api/${username}/posts?page=${pageParam}`)
}

export const fetchPostCount = async (username: string) => {
  return axios.get(`api/${username}/posts/count`)
}

export function postProfileImage(formData: FormData, username: string) {
  return axios.post(`api/${username}/profile`, formData)
}
