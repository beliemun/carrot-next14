"use client";

import { dislikePostAction, likePostAction } from "@/actions/posts";
import { Button } from "../common";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";

interface LikeButtonProps {
  postId: number;
  isLiked: boolean;
}

export const LikeButton = ({ postId, isLiked }: LikeButtonProps) => {
  return (
    <form action={() => (isLiked ? dislikePostAction({ postId }) : likePostAction({ postId }))}>
      <Button
        label={isLiked ? "공감취소" : "공감하기"}
        icon={<HandThumbUpIcon className="size-5" />}
        type="Button"
      />
    </form>
  );
};
