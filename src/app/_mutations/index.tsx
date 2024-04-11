import axios from "axios";

export function handlePostProfileImage(formData: FormData) {
  return axios.post(`api/auth/profile`, formData);
}

export function handleAddPost(formData: FormData) {
  return axios.post("api/posts", formData);
}

export function handleToggleLike({
  post_uid,
  has_liked,
}: {
  post_uid: string;
  has_liked: boolean;
}) {
  return has_liked
    ? axios.post(`api/posts/${post_uid}/like`)
    : axios.post(`api/posts/${post_uid}/unlike`);
}

export function handleDeletePost(post_uid: string) {
  return axios.delete(`api/posts/${post_uid}`);
}

export function handleToggleFollow({
  uid,
  has_followed,
}: {
  uid: string;
  has_followed: boolean;
}) {
  return has_followed
    ? axios.post(`api/friendship/add/${uid}`)
    : axios.post(`api/friendship/remove/${uid}`);
}
