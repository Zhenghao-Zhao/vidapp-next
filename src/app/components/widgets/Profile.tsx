import { User } from "@supabase/supabase-js";
type Props = {
  user: User | null;
}

export default function Profile({ user } : Props) {
  console.log(user);
  return (
    <button className="rounded-full w-8 box-content px-2">
      <img id="img" className="rounded-full" draggable="false" alt="Avatar image" src="https://yt3.ggpht.com/yti/ADpuP3PksSCBWSklp1FqPTr3WCTsS_iSOS8D61GHnQ=s88-c-k-c0x00ffffff-no-rj" />
    </button>
  )
}