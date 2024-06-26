"use client";

import { dislikePostAction, likePostAction } from "@/actions/posts";
import { Button } from "../common";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

interface LikeButtonProps {
  postId: number;
  userId: number;
  isLiked: boolean;
  count?: number;
}

export const LikeButton = ({ postId, userId, isLiked, count = 0 }: LikeButtonProps) => {
  return (
    <form
      action={() =>
        isLiked ? dislikePostAction({ postId, userId }) : likePostAction({ postId, userId })
      }
    >
      <Button
        label={`${isLiked ? "좋아요" : "싫어요"}(${count})`}
        icon={
          isLiked ? (
            <HandThumbUpIcon className="size-5" />
          ) : (
            <HandThumbDownIcon className="size-5" />
          )
        }
        type="Button"
      />
    </form>
  );
};
