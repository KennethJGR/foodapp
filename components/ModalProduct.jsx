import { React, useEffect, useState } from "react";

import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { formatMoney } from "../helpers";

const ModalProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const { products, handleModal, order, handleOrder } = useQuiosco();

    useEffect(() => {
        if (order.some((item) => item.id === products.id)) {
            const product = order.find((item) => item.id === products.id);
            setQuantity(product.quantity);
        }
    }, [products, order]);

    return (
        <div className="md:flex gap-4">
            <div className=" md:w-1/3">
                <Image
                    src={`/assets/img/${products.image}.jpg`}
                    alt={`${products.name}`}
                    width={400}
                    height={300}
                />
            </div>
            <div className=" md:w-2/3">
                <div className="flex justify-end cursor-pointer">
                    <button onClick={() => handleModal()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-9 h-9 text-amber-600 hover:text-amber-700 transition duration-500 ease-in-out"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>

                <h2 className="text-4xl font-bold text-gray-800 ">{products.name}</h2>
                <p className="text-4xl font-black text-amber-500 mt-2">
                    {formatMoney(products.price)}
                </p>

                <div className="flex gap-2 mt-2">
                    <button
                        type="button"
                        onClick={() => {
                            if (quantity > 1) {
                                setQuantity(quantity - 1);
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-9 h-9 text-amber-600 hover:text-amber-700 transition duration-500 ease-in-out"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                    <p className="text-4xl font-bold text-amber-500">{quantity}</p>

                    <button
                        type="button"
                        onClick={() => {
                            if (quantity < 10) {
                                setQuantity(quantity + 1);
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-9 h-9 text-amber-600 hover:text-amber-700 transition duration-500 ease-in-out"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>
                <button
                    type="button"
                    className="bg-amber-500 hover:bg-amber-600  mt-4 p-2 text-white uppercase font-bold rounded transition duration-500 ease-in-out"
                    onClick={() => handleOrder({ ...products, quantity })}
                >
                    Save Order
                </button>
            </div>
        </div>
    );
};

export default ModalProduct;
