import api from "@/app/config";
import { Comment } from "../../_types";

export function handlePostProfileImage(formData: FormData) {
  return api.post(`api/auth/profile`, formData);
}

export function handleAddPost(formData: FormData) {
  return api.post("api/posts", formData);
}

export function handleToggleLike({
  post_uid,
  has_liked,
}: {
  post_uid: string;
  has_liked: boolean;
}) {
  return has_liked
    ? api.post(`api/posts/${post_uid}/like`)
    : api.post(`api/posts/${post_uid}/unlike`);
}

export function handleDeletePost(post_uid: string) {
  return api.delete(`api/posts/${post_uid}`);
}

export function handleToggleFollow({
  uid,
  to_follow,
}: {
  uid: string;
  to_follow: boolean;
}) {
  return to_follow
    ? api.post(`api/friendship/add/${uid}`)
    : api.post(`api/friendship/remove/${uid}`);
}

export function handleAddComment(post_uid: string, formData: FormData) {
  return api.post<Comment>(`api/posts/${post_uid}/comments/add`, formData);
}

export function handleToggleLikeComment({
  comment_uid,
  to_like,
}: {
  comment_uid: string;
  to_like: boolean;
}) {
  return to_like
    ? api.post(`api/comments/${comment_uid}/like`)
    : api.post(`api/comments/${comment_uid}/unlike`);
}
