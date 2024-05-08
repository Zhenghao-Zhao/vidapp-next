import { handleToggleLike } from '@/app/_api/mutations';
import { IconType } from '@/app/_icons';
import { Post } from '@/app/_types';
import IconButton from '@/app/_ui/buttons/iconButton'
import Icon from '@/app/_ui/icon';
import { checkPlural } from '@/app/_utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { optUpdatePaginatedList } from '../utils';
import { PostWithPos } from '@/app/_hooks/paginatedFetch/useFetchPosts';

export default function PostOptions({postData, queryKey }: {postData: PostWithPos, queryKey: string }) {
  const queryClient = useQueryClient();
  const post = postData.post;
  const { mutate: toggleLike } = useMutation({
    mutationFn: handleToggleLike,
    onMutate: async (data) => {
      const prevPost = postData.post;
      const update = {
        has_liked: data.has_liked,
        likes_count: data.has_liked
          ? prevPost.likes_count + 1
          : prevPost.likes_count - 1,
      };
      return await optUpdatePaginatedList<Post>(
        "posts",
        queryClient,
        update,
        queryKey,
        postData.page,
        postData.index
      );
    },
    onError: (error, _variables, context) => {
      console.log(error);
      if (!context) return;
      queryClient.setQueryData(["posts", queryKey], context.prevData);
    },
  });

  const handleLikeClick = () => {
    toggleLike({ post_uid: post.uid, has_liked: !post.has_liked });
  };

  return (
    <div className="flex h-comment-info-height items-center p-2 justify-center shrink-0">
    <IconButton
      icon={post.has_liked ? IconType.Heart : IconType.EmptyHeart}
      tip={post.has_liked ? "Unlike" : "Like"}
      handleClick={handleLikeClick}
      showHighlight={false}
    />
    <p className="grow ml-2">
      {post.likes_count > 0
        ? checkPlural(post.likes_count, 'like', 'likes')
        : "Be the first to like this"}
    </p>
  </div>
  )
}
