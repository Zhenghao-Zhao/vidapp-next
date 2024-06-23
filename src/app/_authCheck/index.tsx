import Auth from "@/app/_components/auth";
import { PropsWithChildren } from "react";
import { Data } from "../(server)/_server/rsc";
import { createClient } from "../_libs/utils/supabase/server";

export default async function AuthChecker({ children }: PropsWithChildren) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return <Auth />;
  }

  return (
    <>
      <Data uid={data.user.id}>{children}</Data>
    </>
  );
}
