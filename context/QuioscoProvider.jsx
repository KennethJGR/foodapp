import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState({});
    const [products, setProducts] = useState({});
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState([]);
    const [name, setName] = useState("");

    const getCategories = async () => {
        const res = await axios.get("http://localhost:3000/api/categories");
        setCategories(res.data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        const random = Math.floor(Math.random() * categories.length);
        setActiveCategory(categories[random]);
    }, [categories]);

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
            }}
        >
            {children}
        </QuioscoContext.Provider>
    );
};

export { QuioscoProvider, QuioscoContext };
