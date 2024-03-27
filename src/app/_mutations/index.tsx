import axios from "axios";

export function postProfileImage(formData: FormData) {
  return axios.post(`api/auth/profile`, formData);
}

export function postPosts(formData: FormData) {
  return axios.post("api/posts", formData);
}

export function postToggleLikeOnPost({post_id, hasLiked}: {post_id: string, hasLiked: boolean}) {
  console.log(hasLiked)
  return hasLiked
    ? axios.post(`api/posts/${post_id}/like`)
    : axios.post(`api/posts/${post_id}/unlike`);
}