import React from "react";
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import Category from "./Category";

const Sidebar = () => {
    const { categories } = useQuiosco();
    return (
        <>
            <Image src="/assets/img/logo.svg" alt="logo" width={250} height={100} />
            <nav>
                {categories.map((category) => (
                    <Category key={category.id} category={category} />
                ))}
            </nav>
        </>
    );
};

export default Sidebar;
