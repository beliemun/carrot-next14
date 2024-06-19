import db from "@/lib/db";

export const UpdateProductAction = async (formData: FormData) => {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  console.log(data);
};
