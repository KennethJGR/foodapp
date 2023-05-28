import React from "react";
import { useRouter } from "next/router";

const steps = [
    { step: 1, name: "Menu", url: "/" },
    { step: 2, name: "Summary", url: "/summary" },
    { step: 3, name: "Total", url: "/total" },
];

const Steps = () => {
    const router = useRouter();

    const currentStep = () => {
        let current;
        if (router.pathname === "/") {
            current = 1;
        } else if (router.pathname === "/summary") {
            current = 50;
        } else if (router.pathname === "/total") {
            current = 100;
        }
        return current;
    };

    return (
        <>
            <div className="flex justify-between space-x-4 mb-4">
                {steps.map((step) => (
                    <button
                        onClick={() => {
                            router.push(step.url);
                        }}
                        key={step.step}
                        className="bg-amber-300 hover:bg-amber-400 text-xl text-gray-800 font-bold py-2 px-4 rounded transition duration-500 ease-in-out "
                    >
                        {step.name}
                    </button>
                ))}
            </div>

            <div className="bg-gray-100 mb-10">
                <div
                    className="bg-amber-300 rounded-full text-xs leading-none h-2 text-center text-white"
                    style={{ width: `${currentStep()}%` }}
                ></div>
            </div>
        </>
    );
};

export default Steps;
