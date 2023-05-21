import React from "react";
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import Category from "./Category";

const Sidebar = () => {
    const { categories } = useQuiosco();
    return (
        <>
            <Image src="/assets/img/logo.svg" alt="logo" width={200} height={100}
            className="mx-auto mt-5"
            />
            <nav
            className="mt-10"
            >
                {categories.map((category) => (
                    <Category key={category.id} category={category} />
                ))}
            </nav>
        </>
    );
};

export default Sidebar;
