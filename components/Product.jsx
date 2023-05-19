import React from "react";
import Image from "next/image";
import { formatMoney } from "../helpers";

const Product = ({ product }) => {
  const { id, name, price, image } = product;

  return (
    <div className=" border p-5 flex flex-col items-center">
      <Image
        src={`/assets/img/${image}.jpg`}
        alt={`Menu ${name}`}
        width={200}
        height={100}
      />
      <div>
        <h3 className="text-2xl font-bold text-gray-700">{name}</h3>
        <p className="mt-2 text-2xl font-bold text-amber-500">
          {formatMoney(price)}
        </p>
      </div>
    </div>
  );
};

export default Product;
