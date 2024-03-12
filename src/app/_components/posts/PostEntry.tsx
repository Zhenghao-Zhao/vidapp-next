import React from "react";
import { BlurImage } from "../images/BlurImage";
import { Icon } from "../common";
import { IconType } from "@/app/_assets/Icons";
import { ModalOpener } from "../modal";
import { AssortedPost } from "@/app/(pages)/profile/_types";

export default function PostEntry({
  post,
  onClick,
}: {
  post: AssortedPost;
  onClick: () => void;
}) {
  return (
    <div className="relative cursor-pointer">
      <ModalOpener onClick={onClick}>
        <BlurImage src={post.Images[0]} alt="uploadImage" />
      </ModalOpener>
      {post.Images.length > 1 && (
        <div className="absolute w-6 h-6 right-0 top-0">
          <Icon icon={IconType.Carousel} />
        </div>
      )}
    </div>
  );
}
