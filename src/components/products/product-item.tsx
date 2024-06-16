import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  id: number;
  title: string;
  price: number;
  createdAt: Date;
  photo: string;
}

export const ProductItem = ({ id, title, price, createdAt, photo }: ProductItemProps) => {
  return (
    <Link className="flex flex-row gap-4" href={`/product/${id}`}>
      <div className="relative size-24 rounded-md overflow-hidden">
        {/* Image의 사이즈를 모를 때 fill 속성을 주고, 부모 엘리먼트를 스타일링한다. */}
        {/* fill은 absolute 이기 때문에 부모에 반드시 relative 속성을 줘야한다. */}
        <Image src={photo} alt={title} fill />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-sm">{title}</span>
        <span className="text-sm">{dayjs().format("YY년 MM월 DD일, A hh:mm")}</span>
        <span className="text-lg font-semibold text-secondary">{price.toLocaleString()}원</span>
      </div>
    </Link>
  );
};
