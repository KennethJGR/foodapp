import Layout from "../../layouts/Layout";
import useQuiosco from "../../hooks/useQuiosco";
import SummaryProduct from "../../components/SummaryProduct";

export default function Summary() {
    const { order } = useQuiosco();
    return (
        <Layout>
            <h1 className="text-4xl text-black-800 font-black">Summary</h1>
            <p className=" text-2xl text-amber-600 font-bold my-10">
                Check your order
            </p>

            {order.length === 0 ? (
                <p className="text-2xl text-gray-800 text-center mt-10">
                   No products
                </p>
            ) : (
                order.map((order) => <SummaryProduct order={order} key={order.id} />)
            )}
        </Layout>
    );
}
