import React, { useContext} from "react";
import { ShopContext } from "../../context/ShopContext";
import Product from "./Product";


export default function Home() {
    const {product} = useContext(ShopContext)

    return (
        <div>
        <div className="flex flex-col items-center min-h-screen bg-gray-50">
            <div className="flex space-between flex-wrap justify-center p-10">
            {product.map((item => (
                    <Product key={item.id} data={item}/>
                )))}
            </div>
        </div>
        </div>
    )
}