"use client";
import { uploadProductAction, getUploadUrl } from "@/actions/product/upload-product.action";
import { Button, Input } from "@/components/common";
import { cn } from "@/lib/utils";
import { useAlertStore } from "@/stores";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function AddProduct() {
  const { show, dismiss } = useAlertStore();
  const router = useRouter();
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [uploadUrl, setUploadUrl] = useState(undefined);
  const [photoId, setPhotoId] = useState(undefined);

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (files) {
      // 사용자가 이미지 파일을 선택하면 로컬 파일 주소를 준비하고, CF에 Presigned Url을 요청한다.
      const file = files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      const { success, result } = await getUploadUrl();
      if (success) {
        const { id, uploadURL } = result;
        setUploadUrl(uploadURL);
        setPhotoId(id);
      }
    }
  };

  // 프로덕트를 생성하는 액션이 실행되기 전에 실행하는 함수
  const interceptAction = async (_: any, formData: FormData) => {
    // 1. CF에 이미지 업로드
    const cloudFlareForm = new FormData();
    cloudFlareForm.append("file", formData.get("photo")!);
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
    // 2. formData에서 photo를 파일에서 string으로 교체
    // form으로 받은 photo를 CF에 업로드하고나온 url로 'photo'의 fromData를 교체한다.
    // 기존에는 file 형태의 formData였지만 string으로 교체된다.
    const photoUrl = `https://imagedelivery.net/2dge226vdVwb9hPmYeHZNQ/${photoId}`;
    formData.set("photo", photoUrl);
    // 3. updateProductAction 호출
    return uploadProductAction(_, formData);
  };

  const [state, action] = useFormState(interceptAction, null);
  return (
    <main className="w-full h-screen">
      <div className="p-4">
        <h1 className="text-3xl">상품 추가하기</h1>
        <form className="space-y-4" action={action}>
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
                {state?.fieldErrors.photo ? (
                  <span className="text-error">{state.fieldErrors.photo}</span>
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
              onChange={onImageChange}
              required
              errors={state?.fieldErrors.photo}
            />
          </label>
          <Input
            name="title"
            placeholder="제목"
            type="text"
            required
            errors={state?.fieldErrors.title}
          />
          <Input
            name="price"
            placeholder="가격"
            type="number"
            required
            errors={state?.fieldErrors.price}
          />
          <Input
            name="description"
            placeholder="설명"
            type="text"
            required
            errors={state?.fieldErrors.description}
          />
          <Button className="w-full" type="Button" label="업로드" />
        </form>
      </div>
    </main>
  );
}
