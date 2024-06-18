"use client";

import { deleteProductAction } from "@/actions";
import { Button } from "../common";
import { useAlertStore } from "@/stores";

export const DeleteProductForm = ({ id }: { id: number }) => {
  const { show, dismiss } = useAlertStore();
  const handleDeleteProduct = async () => {
    await deleteProductAction(id);
    show({
      title: "상품 삭제하기",
      message: "상품이 삭제되었습니다.",
    });
  };
  const handleClickButton = () => {
    show({
      title: "상품 삭제하기",
      message: "정말 상품을 삭제하시겠습니까?",
      actions: [
        {
          lable: "취소",
          onClick: dismiss,
        },
        {
          lable: "삭제",
          style: "primary",
          onClick: () => {
            handleDeleteProduct();
          },
        },
      ],
    });
  };
  return (
    <form action={handleClickButton}>
      <Button type="Button" label="상품 삭제하기" />
    </form>
  );
};
