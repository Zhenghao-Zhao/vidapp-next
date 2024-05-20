import { supaGetFollowing } from "@/app/(server)/api/[uid]/following/_queries";
import { supaGetPost, supaGetUserProfile } from "@/app/(server)/api/[uid]/posts/_queries";

export type FriendData = NonNullable<Awaited<ReturnType<typeof supaGetFollowing>>['data']>[0]
export type ProfileData = NonNullable<Awaited<ReturnType<typeof supaGetUserProfile>>['data']> 
export type PostData= NonNullable<Awaited<ReturnType<typeof supaGetPost>>['data']>