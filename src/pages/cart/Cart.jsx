import React, {useContext} from "react";
import { ShopContext } from "../../context/ShopContext";
import { PRODUCTS } from "../../products";
import CartItem from "./CartItem";

export default function Cart() {

    const {cartItems} = useContext(ShopContext)

    return (
        <div className="bg-white flex justify-center py-5 items-center">
        <div>
            <div>
                <h1 className="text-5xl font-bold mb-6 pt-10 text-center">Your Cart</h1>
            </div>
            <div>
                {PRODUCTS.map((product) => {
                        if(cartItems.get(product.id) !== 0){
                            return <CartItem key={product.id} data={product} extra={cartItems.get(product.id)}/>
                        }
                    }
                )
                }
            </div>
        </div>
        </div>
    )
}