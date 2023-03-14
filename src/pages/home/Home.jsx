import React from "react";
import { PRODUCTS } from "../../products";
import Product from "./Product";

export default function Home() {



    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
                <h1 className="text-6xl font-bold mb-6 pt-10">Tech Shop</h1>
                <div className="flex space-between flex-wrap justify-center p-10">
                    {PRODUCTS.map((product => (
                        <Product data={product}/>
                    )))}
                </div>
            </div>
        </div>
    )
}