import db from "@/lib/db";

const deleteProductAction = async (id: number) => {
  await db.product.delete({
    where: { id },
  });
};

export default deleteProductAction;
