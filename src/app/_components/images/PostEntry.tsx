import React, { RefObject, useCallback, useRef, useState } from "react";
import { BlurImage } from "./BlurImage";
import { Post } from "@/app/_schema/schema";
import { ENV } from "@/app/env";
import { R2_BUCKET_URL_DEV, R2_BUCKET_URL_PUBLIC } from "@/app/constants";
import { Icon } from "../common";
import { IconType } from "@/app/_assets/Icons";
import { ModalOpener } from "../modal/Modal";
import { AssortedPost } from "@/app/(pages)/profile/page";

export default function PostEntry({
  post,
  onClick,
}: {
  post: AssortedPost;
  onClick: () => void;
}) {
  return (
    <div className="relative">
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
