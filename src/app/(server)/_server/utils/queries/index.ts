import {
  supaGetFollowers,
  supaQueryFollowers,
} from "@/app/(server)/api/[uid]/followers/_queries";

import {
  supaGetExplorePosts,
  supaGetPaginatedPosts,
  supaGetPost,
  supaGetUserProfile,
} from "@/app/(server)/api/[uid]/posts/_queries";
import { Database } from "@/app/_libs/schema/supabase";
import { Friend, Post, Profile } from "@/app/_libs/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { mapFriendData, mapPostData, mapProfileData } from "../mappings";
import {
  supaGetFollowing,
  supaGetFollowingPosts,
  supaQueryFollowing,
} from "@/app/(server)/api/[uid]/following/_queries";

export async function getUserFollowing(
  supabase: SupabaseClient<Database>,
  from_uid: string,
  uid: string,
  page = 0,
  limit = 10
) {
  const from = page * limit;
  const { data, error } = await supaGetFollowing(supabase, from_uid, uid, from, limit);
  if (error) {
    return { data, error };
  }
  const following: Friend[] = data.map((userInfo) => {
    return mapFriendData(userInfo);
  });

  const nextCursor = data.length < limit ? null : page + 1;
  return { data: { friends: following, nextCursor }, error };
}

export async function getUserFollowers(
  supabase: SupabaseClient<Database>,
  from_uid: string,
  uid: string,
  page = 0,
  limit = 10
) {
  const from = page * limit;
  const { data, error } = await supaGetFollowers(supabase, from_uid, uid, from, limit);
  if (error) {
    return { data, error };
  }
  const followers: Friend[] = data.map((userInfo) => {
    return mapFriendData(userInfo);
  });

  const nextCursor = data.length < limit ? null : page + 1;
  return { data: { friends: followers, nextCursor }, error };
}

export async function getUserProfile(
  supabase: SupabaseClient<Database>,
  username: string,
  from_uid: string
) {
  const { data, error } = await supaGetUserProfile(
    supabase,
    username,
    from_uid
  );
  if (error) {
    console.log(error);
    return { data, error };
  }
  const profile: Profile = mapProfileData(data);
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
  const { data, error } = await supaGetPaginatedPosts(
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
    return mapPostData(post, from_uid);
  });

  const nextCursor = data.length < limit ? null : page + 1;
  return { data: { posts, nextCursor }, error };
}

export async function getFollowingPosts(
  supabase: SupabaseClient<Database>,
  from_uid: string,
  page = 0,
  limit = 9
) {
  const from = page * limit;
  const { data, error } = await supaGetFollowingPosts(
    supabase,
    from_uid,
    from,
    limit
  );
  if (error) {
    return { data, error };
  }

  const posts: Post[] = data.map((post) => {
    return mapPostData(post, from_uid);
  });

  const nextCursor = data.length < limit ? null : page + 1;
  return { data: { posts, nextCursor }, error };
}

export async function getPost(
  supabase: SupabaseClient<Database>,
  post_uid: string,
  from_uid: string
) {
  const { data, error } = await supaGetPost(supabase, post_uid, from_uid);
  if (error) {
    console.log(error);
    return { data, error };
  }
  const post: Post = mapPostData(data, from_uid);
  return { data: post, error };
}

export async function getExplorePosts(
  supabase: SupabaseClient<Database>,
  from_uid: string,
  page = 0,
  limit = 9
) {
  const from = page * limit;
  const { data, error } = await supaGetExplorePosts(
    supabase,
    from_uid,
    from,
    limit
  );
  if (error) {
    console.log(error);
    return { data, error };
  }

  const posts: Post[] = data.map((post) => {
    return mapPostData(post, from_uid);
  });

  const nextCursor = data.length < limit ? null : page + 1;
  return { data: { posts, nextCursor }, error };
}

export async function getSearchFollowers(
  supabase: SupabaseClient<Database>,
  from_uid: string,
  query: string,
  page = 0,
  limit = 9
) {
  const { data, error } = await supaQueryFollowers(
    supabase,
    from_uid,
    query,
    page,
    limit
  );
  if (error) {
    console.log(error.message);
    return { data, error };
  }
  const friends: Friend[] = data.map((friend) => mapFriendData(friend));
  const nextCursor = data.length < limit ? null : page + 1;
  return { data: { friends, nextCursor }, error };
}

export async function getSearchFollowing(
  supabase: SupabaseClient<Database>,
  from_uid: string,
  query: string,
  page = 0,
  limit = 9
) {
  const { data, error } = await supaQueryFollowing(
    supabase,
    from_uid,
    query,
    page,
    limit
  );
  if (error) {
    console.log(error.message);
    return { data, error };
  }
  const friends: Friend[] = data.map((friend) => mapFriendData(friend));
  const nextCursor = data.length < limit ? null : page + 1;
  return { data: { friends, nextCursor }, error };
}
