import React from "react";
import Image from "next/image";
import { formatMoney } from "../helpers";
import { toast } from "react-toastify";
import axios from "axios";

const Order = ({ orders }) => {
    const { id, name, order, total } = orders;

    const completeOrder = async (id) => {
        try {
            await axios.post(`/api/orders/${id}`);
            toast.success("Order completed successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="border mb-4 p-4 rounded">
            <h3 className="text-2xl text-black-800 font-black">Order: {id}</h3>
            <p className=" text-lg text-amber-600 font-bold my-5">Customer: {name}</p>
            <h1>{order.name}</h1>
            <div>
                {order.map((product) => (
                    <div
                        key={order.id}
                        className="flex items-center border-b last-of-type:border-0 py-3"
                    >
                        <div className="w-32">
                            <Image
                                src={`/assets/img/${product.image}.jpg`}
                                alt={product.name}
                                width={150}
                                height={150}
                            />
                        </div>
                        <div className="p-5 space-y-2">
                            <p className="text-lg text-amber-600 font-bold">
                                Product: {product.name}
                            </p>
                            <p className="text-lg text-gray-600">
                                Quantity: {product.quantity}
                            </p>
                            <p className="text-lg text-gray-600">Price: ${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="md:flex md:items-center md:justify-between">
                <p className="text-2xl text-amber-600 font-bold mt-10 mb-5">
                    Total to pay: {formatMoney(total)}
                </p>

                <button
                    type="button"
                    className="bg-amber-600 hover:bg-amber-800 mt-2 p-2 md:mt-0 text-white uppercase font-bold rounded"
                    onClick={() => completeOrder(id)}
                >
                    Complete order
                </button>
            </div>
        </div>
    );
};

export default Order;
