import axios from "axios";

export const fetchUserPosts = async (pageParam: number) => {
  return axios.get(`api/posts?page=${pageParam}`)
}

export const fetchPostCount = async () => {
  return axios.get('api/posts/count')
}

export function postProfileImage(formData: FormData) {
  return axios.post('api/profile/image', formData)
}
