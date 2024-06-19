"use client";
import { UpdateProductAction } from "@/actions/product/upload-product.action";
import { Button, Input } from "@/components/common";
import { cn } from "@/lib/utils";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function AddProduct() {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (files) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      console.log(url);
    }
  };

  return (
    <main className="w-full h-screen">
      <div className="p-4">
        <h1 className="text-3xl">상품 추가하기</h1>
        <form className="space-y-4" action={UpdateProductAction}>
          <label
            htmlFor="photo"
            className={cn(
              "col-center aspect-square rounded-3xl mt-4",
              "hover:text-primary hover:border-primary cursor-pointer bg-cover",
              preview ? "hover:opacity-70" : "border-2 border-dashed"
            )}
            style={{ backgroundImage: `url(${preview})` }}
          >
            {!preview ? (
              <>
                <PhotoIcon className="size-24 opacity" />
                <span className="">사진을 추가해주세요.</span>
              </>
            ) : null}
            <Input
              className="hidden"
              id="photo"
              name="photo"
              placeholder="사진"
              type="file"
              onChange={onImageChange}
              required
            />
          </label>
          <Input name="title" placeholder="제목" type="text" required />
          <Input name="price" placeholder="가격" type="number" required />
          <Input name="description" placeholder="설명" type="text" required />
          <Button className="w-full" type="Button" label="업로드" />
        </form>
      </div>
    </main>
  );
}
