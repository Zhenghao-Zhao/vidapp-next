import { Database } from "@/app/_schema/supabase";
import { Profile } from "@/app/_types";
import { supaGetFollowersFunction } from "@/app/api/[uid]/followers/_queries";
import { supaGetUserProfileWithFunction } from "@/app/api/[uid]/posts/_queries";
import { ENV } from "@/app/env";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserFollowers(supabase: SupabaseClient<Database>, uid: string) {
  const { data, error } = await supaGetFollowersFunction(supabase, uid);
  if (error) {
    return error;
  }
  const rtn = data.map((userInfo) => {
    return {
      username: userInfo.ret_username,
      name: userInfo.ret_name,
      imageURL: userInfo.ret_profile_image && ENV.R2_BUCKET_URL_PUBLIC + "/" + userInfo.ret_profile_image
    }
  })

  return rtn;
}

export async function getUserProfile(supabase: SupabaseClient<Database>, uid: string, from_uid: string) {
  
  const { data, error } = await supaGetUserProfileWithFunction(
    supabase, 
    uid,
    from_uid
  );
  if (error) {
    return {data: null, error};
  }
  const imageURL =
    data.ret_profile_image && ENV.R2_BUCKET_URL_PUBLIC + "/" + data.ret_profile_image;
  const profile: Profile = {
    username: data.ret_username,
    name: data.ret_name,
    imageURL: imageURL,
    post_count: data.ret_post_count,
    follower_count: data.ret_follower_count,
    has_followed: data.ret_has_followed,
  };
  return {data: profile, error: null};
}