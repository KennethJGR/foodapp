import styles from "../../styles/index.module.css";
import Layout from "../../layouts/Layout";
import Product from "../../components/Product";
import useQuiosco from "../../hooks/useQuiosco";

export default function Home() {
  const { activeCategory } = useQuiosco();

  return (
    <Layout>
      <h1 className="text-2xl text-red-800 font-bold">{activeCategory?.name}</h1>

      <p className="text-4xl text-amber-600 my-10">Choose and personalize your order</p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
        {activeCategory?.products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
}
