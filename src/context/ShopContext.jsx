import React, { createContext, useState } from "react";
import { PRODUCTS } from "../products";


export const ShopContext = createContext(null);

function getDefaultCart()
{
    let cart = new Map();
    for(let i=0; i < PRODUCTS.length; i++){
        cart.set(PRODUCTS[i].id, 0);
    }
    return(cart);
}

export default function ShopContextProvider(props){
    const [cartItems, setCartItems] = useState(getDefaultCart());


    const addToCart = (id) =>{
        setCartItems((prev) => new Map(prev).set(id, prev.get(id)+ 1))
    }

    const decreaseCountInCart = (id) =>{
        setCartItems((prev) => new Map(prev).set(id, prev.get(id)-1))
    }

    const removeFromCart = (id) =>{
        setCartItems((prev) => new Map(prev).set(0))
    }
    
    const contextValue= {cartItems, addToCart, decreaseCountInCart, removeFromCart}
    
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}