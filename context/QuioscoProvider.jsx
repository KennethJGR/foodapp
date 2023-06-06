import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState({});
    const [products, setProducts] = useState({});
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState([]);
    const [name, setName] = useState("");
    const [total, setTotal] = useState(0);

    const router = useRouter();

    const getCategories = async () => {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        const random = Math.floor(Math.random() * categories.length);
        setActiveCategory(categories[random]);
    }, [categories]);

    useEffect(() => {
        const newTotal = order.reduce(
            (total, product) => product.price * product.quantity + total,
            0
        );
        setTotal(newTotal);
    }, [order]);

    const handleActiveCategory = (id) => {
        const category = categories.find((category) => category.id === id);

        setActiveCategory(category);
    };

    const handleSetProducts = (products) => {
        setProducts(products);
    };

    const handleModal = () => {
        setModal(!modal);
    };

    const handleOrder = ({ categoryId, ...product }) => {
        if (order.some((item) => item.id === product.id)) {
            //update quantity
            const orderUpdate = order.map((item) =>
                item.id === product.id ? product : item
            );
            setOrder(orderUpdate);

            toast.info("Order updated");
        } else {
            setOrder([...order, product]);
            toast.success("Order added to cart");
        }

        setModal(false);
    };

    const handleEditOrder = (id) => {
        const orderUpdate = order.filter((item) => item.id === id);

        setProducts(orderUpdate[0]);

        console.log(id);

        setModal(!modal);
    };

    const deleteOrder = (id) => {
        const orderUpdate = order.filter((item) => item.id !== id);

        setOrder(orderUpdate);

        toast.error("Order deleted");
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/api/orders", {
                order,
                name,
                total,
                date: Date.now().toString(),
            });

            //reset order
            setActiveCategory(categories[0]);
            setOrder([]);
            setName("");
            setTotal(0);

            toast.success("Order placed");

            setTimeout(() => {
                router.push("/");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

   


    return (
        <QuioscoContext.Provider
            value={{
                categories,
                activeCategory,
                handleActiveCategory,
                products,
                handleSetProducts,
                modal,
                handleModal,
                order,
                handleOrder,
                handleEditOrder,
                deleteOrder,
                name,
                setName,
                placeOrder,
                total,
            }}
        >
            {children}
        </QuioscoContext.Provider>
    );
};

export { QuioscoProvider, QuioscoContext };
