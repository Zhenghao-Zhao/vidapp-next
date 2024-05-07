import axios from "axios";
import { Comment } from "../../_types";

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
  to_follow,
}: {
  uid: string;
  to_follow: boolean;
}) {
  return to_follow
    ? axios.post(`api/friendship/add/${uid}`)
    : axios.post(`api/friendship/remove/${uid}`);
}

export function handleAddComment(post_uid: string, formData: FormData) {
  return axios.post<Comment>(`api/posts/${post_uid}/comments/add`, formData);
}

export function handleToggleLikeComment({
  comment_uid,
  to_like,
}: {
  comment_uid: string;
  to_like: boolean;
}) {
  return to_like
    ? axios.post(`api/comments/${comment_uid}/like`)
    : axios.post(`api/comments/${comment_uid}/unlike`);
}
