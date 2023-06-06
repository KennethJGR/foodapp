import { useEffect, useCallback } from "react";
import Layout from "../../layouts/Layout";
import useQuiosco from "../../hooks/useQuiosco";
import { formatMoney } from "../../helpers";

export default function Total() {
    const { order, name, setName, placeOrder, total } = useQuiosco();

    const checkForm = useCallback(() => {
        return order.length === 0;
    }, [order]);

    useEffect(() => {
        checkForm();
    }, [order, checkForm]);

    return (
        <Layout>
            <h1 className="text-4xl text-black-800 font-black">Total</h1>
            <p className=" text-2xl text-amber-600 font-bold my-10">
                Check your total
            </p>
            <form action="" onSubmit={placeOrder}>
                <div>
                    <label
                        htmlFor="name"
                        className="block uppercase text-black-700 text-xl font-bold mb-2"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        required
                        className="bg-gray-200  border-2 rounded w-full py-2 px-3 lg:w-1/3 text-black-700 focus:outline-none focus:border-amber-500 required:focus:border-red-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mt-10">
                    <p className="text-2xl text-black-800 font-bold">
                        Order:
                        <span className="font-bold">{formatMoney(total)}</span>
                    </p>
                </div>

                <div className="mt-5">
                    <input
                        value="Check Order"
                        className="bg-amber-500 hover:bg-amber-600 w-full lg:w-auto text-white font-bold py-2 px-4 rounded mt-10 text-center cursor-pointer
                        disabled:hover:bg-amber-500
                        disabled:opacity-60 disabled:cursor-not-allowed
                        "
                        type="submit"
                        disabled={checkForm()}
                    />
                </div>
            </form>
        </Layout>
    );
}
