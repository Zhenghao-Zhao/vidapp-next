import { Database } from "@/app/_schema/supabase";
import { Friend, Post, Profile } from "@/app/_types";
import { supaGetFollowers } from "@/app/api/[uid]/followers/_queries";
import {
  supaGetFollowing,
  supaGetFollowingPosts,
} from "@/app/api/[uid]/following/_queries";
import {
  supaGetPaginatedPostsFunction,
  supaGetUserProfileWithFunction,
} from "@/app/api/[uid]/posts/_queries";
import { getImageURLFromFilename } from "@/app/api/_utils";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserFollowing(
  supabase: SupabaseClient<Database>,
  uid: string,
  page = 0,
  limit = 10
) {
  const from = page * limit;
  const { data, error } = await supaGetFollowing(supabase, uid, from, limit);
  if (error) {
    return { data, error };
  }
  const following: Friend[] = data.map((userInfo) => {
    return {
      uid: userInfo.ret_uid,
      username: userInfo.ret_username,
      name: userInfo.ret_name,
      imageURL: getImageURLFromFilename(userInfo.ret_profile_image),
      has_followed: true,
    };
  });

  const nextCursor = data.length < limit ? null : page + 1;
  return { data: { friends: following, nextCursor }, error };
}

export async function getUserFollowers(
  supabase: SupabaseClient<Database>,
  uid: string,
  page = 0,
  limit = 10
) {
  const from = page * limit;
  const { data, error } = await supaGetFollowers(supabase, uid, from, limit);
  if (error) {
    return { data, error };
  }
  const followers: Friend[] = data.map((userInfo) => {
    return {
      uid: userInfo.ret_uid,
      username: userInfo.ret_username,
      name: userInfo.ret_name,
      imageURL: getImageURLFromFilename(userInfo.ret_profile_image),
      has_followed: userInfo.ret_has_followed,
    };
  });

  const nextCursor = data.length < limit ? null : page + 1;
  return { data: { friends: followers, nextCursor }, error };
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
    return { data, error };
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
  return { data: profile, error };
}

export async function getPagePosts(
  supabase: SupabaseClient<Database>,
  uid: string,
  from_uid: string,
  page = 0,
  limit = 9
) {
  const from = page * limit;
  const { data, error } = await supaGetPaginatedPostsFunction(
    supabase,
    uid,
    from_uid,
    from,
    limit
  );
  if (error) {
    console.log(error);
    return { data, error };
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

  const nextCursor = data.length < limit ? null : page + 1;
  return { data: { posts, nextCursor }, error };
}

export async function getFollowingPosts(
  supabase: SupabaseClient<Database>,
  uid: string,
  page = 0,
  limit = 9
) {
  const from = page * limit;
  const { data, error } = await supaGetFollowingPosts(
    supabase,
    uid,
    from,
    limit
  );
  if (error) {
    return { data, error };
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
      uid: post.ret_post_uid,
      created_at: post.ret_created_at,
      description: post.ret_description,
      likes_count: post.ret_likes_count,
      imageURLs: imageURLs,
      has_liked: post.ret_has_liked,
      owner: owner_info,
    };
  });

  const nextCursor = data.length < limit ? null : page + 1;
  return { data: { posts, nextCursor }, error };
}
