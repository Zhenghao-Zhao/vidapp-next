import PostEntry from "@/app/_components/posts/PostEntry";
import { Post } from "@/app/_schema";

export default function PageGrid({
  page,
  addCurrentPost,
}: {
  page: Post[];
  addCurrentPost: (p: Post) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {page.map((post, i) => (
        <PostEntry post={post} key={i} onClick={() => addCurrentPost(post)} />
      ))}
    </div>
  );
}