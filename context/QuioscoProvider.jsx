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
        console.log(random);
    }, [categories]);

    const handleActiveCategory = (id) => {
        const category = categories.find((category) => category.id === id);
        console.log(category);
        setActiveCategory(category);
    };

    const handleSetProducts = (products) => {
        setProducts(products);
        console.log(products);
    };

    const handleModal = () => {
        setModal(!modal);
    };

    const handleOrder = ({ categoryId, image, ...product }) => {
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
            }}
        >
            {children}
        </QuioscoContext.Provider>
    );
};

export { QuioscoProvider, QuioscoContext };
