import React from "react";
import Image from "next/image";
import { formatMoney } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Product = ({ product }) => {
  const { handleSetProducts, handleModal } = useQuiosco();

  const { id, name, price, image } = product;

  return (
    <div className=" border p-5 flex flex-col items-center">
      <Image
        src={`/assets/img/${image}.jpg`}
        alt={`Menu ${name}`}
        width={300}
        height={300}
      />
      <div>
        <h3 className="text-2xl font-bold text-gray-700">{name}</h3>
        <p className="mt-2 text-2xl font-bold text-amber-500">
          {formatMoney(price)}
        </p>

        <button
          type="button"
          className="bg-gradient-to-r from-yellow-400  to-amber-500 px-4 py-2 mt-5 text-white font-bold hover:from-yellow-500 hover:to-amber-600 uppercase rounded"
          onClick={() => {
            handleSetProducts(product);
            handleModal();
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
