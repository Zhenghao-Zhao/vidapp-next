import { IconType } from "@/app/_assets/Icons";
import { Post } from "@/app/_types";
import { Icon } from "../common";
import { BlurImage } from "../images/BlurImage";

export default function PostEntry({
  post,
  onClick,
}: {
  post: Post;
  onClick: () => void;
}) {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <BlurImage src={post.imageURLs[0]} alt="uploadImage" />
      {post.imageURLs.length > 1 && (
        <div className="absolute top-0 right-0 w-8 h-8 flex">
          <div className="w-6 h-6 m-auto">
            <Icon icon={IconType.Carousel} />
          </div>
        </div>
      )}
    </div>
  );
}
