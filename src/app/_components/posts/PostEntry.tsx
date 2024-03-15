import React from "react";
import { BlurImage } from "../images/BlurImage";
import { Icon } from "../common";
import { IconType } from "@/app/_assets/Icons";
import { ModalOpener } from "../modal";
import { Post } from "@/app/_schema";

export default function PostEntry({
  post,
  onClick,
}: {
  post: Post;
  onClick: () => void;
}) {
  return (
    <div className="relative cursor-pointer">
      <ModalOpener onClick={onClick}>
        <BlurImage src={post.imageURLs[0]} alt="uploadImage" />
      </ModalOpener>
      {post.imageURLs.length > 1 && (
        <div className="absolute w-6 h-6 right-0 top-0">
          <Icon icon={IconType.Carousel} />
        </div>
      )}
    </div>
  );
}
