import { Database } from "@/app/_schema/supabase";
import { Friend, Post, Profile } from "@/app/_types";
import { supaGetFollowers } from "@/app/api/[uid]/followers/_queries";
import { supaGetFollowing } from "@/app/api/[uid]/following/_queries";
import {
  supaGetPaginatedPostsFunction,
  supaGetUserProfileWithFunction,
} from "@/app/api/[uid]/posts/_queries";
import { getImageURLFromFilename } from "@/app/api/_utils";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserFollowing(
  supabase: SupabaseClient<Database>,
  uid: string,
  from = 0,
  limit = 10
) {
  const { data, error } = await supaGetFollowing(
    supabase,
    uid,
    from,
    limit
  );
  if (error) {
    return error.message;
  }
  const following: Friend[] = data.map((userInfo) => {
    return {
      uid: userInfo.ret_uid,
      username: userInfo.ret_username,
      name: userInfo.ret_name,
      imageURL: getImageURLFromFilename(userInfo.ret_profile_image),
    };
  });

  const nextCursor = data.length < limit ? null : 1;
  return { friends: following, nextCursor };
}

export async function getUserFollowers(
  supabase: SupabaseClient<Database>,
  uid: string,
  from = 0,
  limit = 10
) {
  const { data, error } = await supaGetFollowers(
    supabase,
    uid,
    from,
    limit
  );
  if (error) {
    return error.message;
  }
  const followers: Friend[] = data.map((userInfo) => {
    return {
      uid: userInfo.ret_uid,
      username: userInfo.ret_username,
      name: userInfo.ret_name,
      imageURL: getImageURLFromFilename(userInfo.ret_profile_image),
    };
  });

  const nextCursor = data.length < limit ? null : 1;
  return { friends: followers, nextCursor };
}

export async function getUserProfile(
  supabase: SupabaseClient<Database>,
  username: string,
  from_uid: string
) {
  const { data, error } = await supaGetUserProfileWithFunction(
    supabase,
    username,
    from_uid
  );
  if (error) {
    console.log(error);
    return undefined;
  }
  const imageURL = getImageURLFromFilename(data.ret_profile_image);
  const profile: Profile = {
    uid: data.ret_uid,
    username: data.ret_username,
    name: data.ret_name,
    imageURL: imageURL,
    post_count: data.ret_post_count,
    follower_count: data.ret_follower_count,
    following_count: data.ret_following_count,
    has_followed: data.ret_has_followed,
  };
  return profile;
}

export async function getFirstPagePosts(
  supabase: SupabaseClient<Database>,
  uid: string,
  from_uid: string,
  from = 0,
  limit = 9
) {
  const { data, error } = await supaGetPaginatedPostsFunction(
    supabase,
    uid,
    from_uid,
    from,
    limit
  );
  if (error) {
    console.log(error);
    return undefined;
  }

  const posts: Post[] = data.map((post) => {
    const imageURLs = post.ret_post_images.map((filename) => {
      return getImageURLFromFilename(filename);
    });
    const owner_info = {
      username: post.ret_username,
      name: post.ret_name,
      imageURL: getImageURLFromFilename(post.ret_profile_image),
    };
    return {
      uid: post.ret_uid,
      created_at: post.ret_created_at,
      description: post.ret_description,
      likes_count: post.ret_likes_count,
      imageURLs: imageURLs,
      has_liked: post.ret_has_liked,
      owner: owner_info,
    };
  });

  const nextCursor = data.length < limit ? null : 1;
  return { posts, nextCursor };
}
