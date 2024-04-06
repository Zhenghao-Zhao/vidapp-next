import { createServerSupabaseClient } from "@/app/_utility/supabase-server";
import Content from "./_content";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { username: string } }) {
  const supabase = createServerSupabaseClient();
  const {data, error} = await supabase.from('profiles').select('user_id').eq('username', params.username).single();
  if (error) {
    notFound()
  }
  return <Content uid={data.user_id} /> 
}
