import axios from "axios";
import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import Product from "./Product";


export default function Home() {
    const endpoint = "http://localhost:8080/api/products";

    const {product, setProduct} = useContext(ShopContext)    

    function getProducts (){
        axios.get(endpoint).then((response)=> {
            console.log(response.data._embedded.productList)
            setProduct(response.data._embedded.productList)
        })
    }

    useEffect(() => {
        getProducts();
    })

    return (
        <div>
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
            <h1 className="text-6xl font-bold mb-6 pt-10">Tech Shop</h1>
            <div className="flex space-between flex-wrap justify-center p-10">
            {product.map((item => (
                    <Product key={item.id} data={item}/>
                )))}
            </div>
        </div>
        </div>
    )
}