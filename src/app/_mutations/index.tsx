import axios from "axios";

export function handlePostProfileImage(formData: FormData) {
  return axios.post(`api/auth/profile`, formData);
}

export function handleAddPost(formData: FormData) {
  return axios.post("api/posts", formData);
}

export function handleToggleLike({post_id, has_liked}: {post_id: string, has_liked: boolean}) {
  return has_liked
    ? axios.post(`api/posts/${post_id}/like`)
    : axios.post(`api/posts/${post_id}/unlike`);
}

export function handleDeletePost(post_id: string) {
  return axios.delete(`api/posts/${post_id}`)
}