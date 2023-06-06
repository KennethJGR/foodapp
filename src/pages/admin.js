import AdminLayout from "../../layouts/AdminLayout";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import Order from "../../components/Order";

export default function Admin() {
    const fetcher = () => axios.get("/api/orders").then((res) => res.data);

    const { data, error, isLoading } = useSWR("/api/orders", fetcher, {
        refreshInterval: 100,
    });

    const router = useRouter();

    return (
        <AdminLayout>
            <h1 className="text-4xl text-black-800 font-black">
                Administration Panel
            </h1>
            <p className=" text-2xl text-amber-600 font-bold my-10">
                Order Management
            </p>

            {data && data.length
                ? data.map((orders) => <Order key={orders.id} orders={orders} />)
                : " No orders found. "}

            <button
                onClick={() => router.push("/")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                Orders
            </button>
        </AdminLayout>
    );
}
