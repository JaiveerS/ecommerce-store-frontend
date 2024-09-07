import React, { useContext} from "react";
import { ShopContext } from "../../context/ShopContext";
import Product from "./Product";
import axios from "axios";


export default function Home() {
    const {product, getProducts} = useContext(ShopContext)


    return (
        <div>
            {product.length === 0 ? getProducts() : ""}
            <div className="flex flex-col items-center min-h-screen">
                <div className="flex space-between flex-wrap justify-center p-10 max-w-screen-2xl">
                {product.map((item => (
                        <Product key={item.id} data={item}/>
                    )))}
                </div>
            </div>
        </div>
    )
}