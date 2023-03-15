import React, {useContext} from "react";
import { ShopContext } from "../../context/ShopContext";
import { PRODUCTS } from "../../products";
import CartItem from "./CartItem";

export default function Cart() {

    const {addToCart, cartItems} = useContext(ShopContext)

    return (
        <div>
            <div>
                <h1>Your Cart</h1>
            </div>
            <div>
                {PRODUCTS.map((product) => {
                        if(cartItems.get(product.id) !== 0){
                            return <CartItem data={product}/>
                        }
                    }
                )
                }
            </div>
        </div>
    )
}