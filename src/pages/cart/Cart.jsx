import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
// import { PRODUCTS } from "../../products";
import CartItem from "./CartItem";

export default function Cart() {

    const {cartItems, product, cartQuantity} = useContext(ShopContext)

    var total = 0;

    return (
        <div className="bg-white flex justify-center items-center">
        <div className="min-h-screen">
            <div>
                <h1 className="text-3xl font-bold mb-6 pt-10 text-center">{cartQuantity  > 0 ? 'Shoping Cart' : 'Your Cart is empty.'}</h1>
                <Link className="hover:underline hover:font-bold text-center" to={"/"}>{cartQuantity  === 0 && ('start shopping')}</Link>
            </div>
            <div>
                {product.map((product) => {
                        if(cartItems.get(product.id) !== 0){
                            total += cartItems.get(product.id) * product.price;
                            return <CartItem key={product.id} data={product} extra={cartItems.get(product.id)}/>
                        }
                    }
                )
                }
                <h1 className="text-3xl font-bold mb-6 pt-10 text-center">{cartQuantity  > 0 && 'Total = $' + total}</h1>
            </div>
        </div>
        </div>
    )
}