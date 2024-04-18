import { getFirstPagePosts } from '@/app/_server/utils/queries';
import { createClient } from '@/app/_utility/supabase/server';
import { notFound } from 'next/navigation';
import Content from './Content';

export default async function Main({uid, from_uid, isOwner}: {uid: string, from_uid: string, isOwner: boolean}) {
  const supabase = createClient();

  const postData = await getFirstPagePosts(
    supabase,
    uid,
    from_uid,
    0,
    9
  );
  if (!postData) return notFound();
  const postInitData = {
    pageParams: [],
    pages: [{ nextCursor: postData.nextCursor, posts: postData.posts }],
  };
  return (
    <Content uid={uid} isOwner={isOwner} initialData={postInitData} />
  )
}
