"use client";

import { dislikePostAction, likePostAction } from "@/actions/posts";
import { Button } from "../common";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { startTransition, useOptimistic } from "react";

interface LikeButtonProps {
  postId: number;
  userId: number;
  isLiked: boolean;
  count?: number;
}

export const LikeButton = ({ postId, userId, isLiked, count = 0 }: LikeButtonProps) => {
  // useOptimistic의 첫번째 값의 반환 형태, 두번째는 두개의 파라미터를 가지는 함수
  // 함수의 첫번째는 prev값 두번째는 recucer에 전달되는 파라미터
  const [state, reducer] = useOptimistic({ isLiked, count }, (prev, payload: number) => ({
    isLiked: !prev.isLiked,
    count: payload + prev.count,
  }));
  const handleClick = () => {
    // reducer를 사용할때에는 form의 action 안에서 호출하거나 startTransition으로 감싸야 한다.
    startTransition(() => {
      if (state.isLiked) {
        reducer(-1);
        dislikePostAction({ postId, userId });
      } else {
        reducer(1);
        likePostAction({ postId, userId });
      }
    });
  };
  return (
    <Button
      label={`${state.isLiked ? "싫어요" : "좋아요"}(${state.count})`}
      icon={
        state.isLiked ? (
          <HandThumbDownIcon className="size-5" />
        ) : (
          <HandThumbUpIcon className="size-5" />
        )
      }
      type="Button"
      onClick={handleClick}
    />
  );
};
