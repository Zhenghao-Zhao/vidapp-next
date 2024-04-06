import { createServerSupabaseClient } from "@/app/_utility/supabase-server";
import { ENV } from "@/app/env";

export async function Data() {
  const supabase = createServerSupabaseClient()
  const {data: sessionData} = await supabase.auth.getSession();
  if (!sessionData || !sessionData.session) return null;

  const id = sessionData.session.user.id
  const {data: profileData} = await supabase.from("profiles").select('user_id, username, name, image_filename').eq('user_id', id).single();
  if (!profileData) return null;
  const imageURL = profileData.image_filename && ENV.R2_BUCKET_URL_PUBLIC + "/" + profileData.image_filename
  const appData = {...profileData, imageURL}
  return (
    <script
      id="data"
      type="application/json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(appData)}}
    />
  );
}
