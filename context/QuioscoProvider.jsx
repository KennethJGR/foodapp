import { useState, useEffect, createContext } from "react";
import axios from "axios";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState({});

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

    return (
        <QuioscoContext.Provider
            value={{
                categories,
                activeCategory,
                handleActiveCategory,
            }}
        >
            {children}
        </QuioscoContext.Provider>
    );
};

export { QuioscoProvider, QuioscoContext };
