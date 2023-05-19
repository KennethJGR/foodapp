import React from "react";
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";

const Category = ({ category }) => {
    const { handleActiveCategory, activeCategory } = useQuiosco();

    const { id, name, icon } = category;

    return (
        <button
            type="button"
            onClick={() => handleActiveCategory(id)}
            className={`${activeCategory?.id === id
                    ? "bg-gradient-to-r from-amber-200 to-amber-300"
                    : ""
                } flex items-center mt-4 cursor-pointer gap-4 border hover:bg-gradient-to-r from-amber-200 to-amber-300 p-5 w-full text-2xl font-bold text-gray-600 `}
        >
            <Image
                src={`/assets/img/icono_${icon}.svg`}
                alt="icon"
                width={50}
                height={50}
            />

            {name}
        </button>
    );
};

export default Category;
