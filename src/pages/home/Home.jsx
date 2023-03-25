import axios from "axios";
import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import Product from "./Product";


export default function Home() {
    const endpoint = "http://localhost:8080/api/products";
    // const endpoint = "https://shop-backend-production-3a40.up.railway.app/api/products";


    const {product, setProduct,cartItems, setCartItems, getDefaultCart} = useContext(ShopContext)    

    function getProducts (){
        axios.get(endpoint).then((response)=> {
            setProduct(response.data._embedded.productList)
        })
    }

    useEffect(() => {
        getProducts();
        if (cartItems.size !== product.length){
            setCartItems(getDefaultCart(product))
        }
    })

    return (
        <div>
        <div className="flex flex-col items-center min-h-screen bg-gray-50">
            <h1 className="text-6xl font-bold mb-6 pt-10">Shop</h1>
            <div className="flex space-between flex-wrap justify-center p-10">
            {product.map((item => (
                    <Product key={item.id} data={item}/>
                )))}
            </div>
        </div>
        </div>
    )
}