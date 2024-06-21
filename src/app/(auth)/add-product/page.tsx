"use client";
import { getUploadUrl, uploadProductAction } from "@/actions/product";
import { Button, Input } from "@/components/common";
import { ProductFormType, productSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { useAlertStore } from "@/stores";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export default function AddProduct() {
  const { show, dismiss } = useAlertStore();
  const router = useRouter();
  const [preview, setPreview] = useState<string | undefined>(undefined);
  // CF에서 받은 1회성 업로드 전용 URL
  const [uploadUrl, setUploadUrl] = useState(undefined);
  // Zod Schema를 사용하여 Validation을 할 수 있다.
  const [file, setFile] = useState<File | undefined>(undefined);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormType>({ resolver: zodResolver(productSchema) });

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (files) {
      // 사용자가 이미지 파일을 선택하면 로컬 파일 주소를 준비하고, CF에 Presigned Url을 요청한다.
      const file = files[0];
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
      const { success, result } = await getUploadUrl();
      if (success) {
        const { id, uploadURL } = result;
        setUploadUrl(uploadURL);
        setValue("photo", `https://imagedelivery.net/2dge226vdVwb9hPmYeHZNQ/${id}`);
      }
    }
  };

  // 프로덕트를 생성하는 액션이 실행되기 전에 실행하는 함수.
  // ** react hook form이 사용되면 useFormState을 사용할 필요가 없어진다.
  // ** form의 state와 error가 react hook form에서 처리되기 때문이다.
  const onSubmit = handleSubmit(async (data: ProductFormType) => {
    if (!file) {
      return;
    }
    // 1. CF에 이미지 업로드
    const cloudFlareForm = new FormData();
    cloudFlareForm.append("file", file);
    if (!uploadUrl) return;
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: cloudFlareForm,
    });
    console.log("response:", response);
    if (response.status !== 200) {
      show({
        title: "업로드 오류",
        message: "이미지 업로드에 실패했습니다.",
        actions: [
          {
            lable: "확인",
            onClick: () => {
              dismiss();
              router.back();
            },
          },
        ],
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("photo", data.photo);
    // 3. updateProductAction 호출
    return uploadProductAction(formData);
  });

  // handleSubmit으로 부터 onValied가 호출되었다면 data는 이미 validate된 상태이다.
  const onValied = async () => {
    await onSubmit();
  };

  return (
    <main className="w-full min-h-screen">
      <div className="p-4">
        <h1 className="text-3xl">상품 추가하기</h1>
        <form className="space-y-4" action={onValied}>
          <label
            htmlFor="photo"
            className={cn(
              "col-center aspect-square rounded-3xl mt-4",
              "hover:text-primary hover:border-primary cursor-pointer bg-cover",
              preview ? "hover:opacity-70" : "border-2 border-dashed"
            )}
            style={{ ...(preview && { backgroundImage: `url(${preview})` }) }}
          >
            {!preview ? (
              <>
                <PhotoIcon className="size-24 opacity" />
                {errors.photo?.message ? (
                  <span className="text-error">{errors.photo.message}</span>
                ) : (
                  <span>사진을 추가해주세요.</span>
                )}
              </>
            ) : null}
            <Input
              className="hidden"
              id="photo"
              name="photo"
              placeholder="사진"
              type="file"
              required
              // photo 는 string이어야만 하기 때문에 register에 등록하지 않는다. 하지만 나중에 해야 함(?)
              // {...register("photo")}
              errors={errors.photo?.message ? [errors.photo?.message] : undefined}
              onChange={onImageChange}
            />
          </label>
          <Input
            placeholder="제목"
            type="text"
            required
            {...register("title")}
            // 기존의 errors 필드는 zod의 에러 아웃풋 형식을 따라 만들어졌으므로 아래와 같이 타입을 맞춰준다.
            errors={errors.title?.message ? [errors.title?.message] : undefined}
          />
          <Input
            placeholder="가격"
            type="number"
            required
            {...register("price")}
            errors={errors.price?.message ? [errors.price?.message] : undefined}
          />
          <Input
            placeholder="설명"
            type="text"
            required
            {...register("description")}
            errors={errors.description?.message ? [errors.description?.message] : undefined}
          />
          <Button className="w-full" type="Button" label="업로드" />
        </form>
      </div>
    </main>
  );
}
