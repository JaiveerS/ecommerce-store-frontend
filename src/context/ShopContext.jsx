import React, { createContext, useState } from "react";
// import { PRODUCTS } from "../products";


export const ShopContext = createContext(null);

export function getDefaultCart(product)
{
    let cart = new Map();
    product.forEach(element => {
        cart.set(element.id, 0);
    });
    return(cart);
}

export default function ShopContextProvider(props){
    // shop-backend-v1-production.up.railway.app
    const endpoint = "http://localhost:8080/api/products";
    const authEndpoint = "http://localhost:8080/api/auth";
    const orderEndpoint = "http://localhost:8080/api/orders";
    const categoriesEndpoint = "http://localhost:8080/api/categories";
    // const endpoint = "http://140.238.147.51:8080/api/products";
    // const authEndpoint = "http://140.238.147.51:8080/api/auth";
    // const orderEndpoint = "http://140.238.147.51:8080/api/orders";
    // const categoriesEndpoint = "http://140.238.147.51:8080/api/categories";


    const [id, setId] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [jwt, setJwt] = useState("");
    const [cartQuantity, setCartQuantity] = useState(0);
    const [product, setProduct] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart(product));


    const addToCart = (id) =>{
        setCartItems((prev) => new Map(prev).set(id, prev.get(id)+ 1));
        setCartQuantity((prev) => prev + 1);
    }

    const decreaseCountInCart = (id) =>{
        setCartItems((prev) => new Map(prev).set(id, prev.get(id)-1))
        setCartQuantity((prev) => prev - 1);
    }

    const removeFromCart = (id) =>{
        const amount = cartItems.get(id)
        setCartItems((prev) => new Map(prev).set(id, 0))
        setCartQuantity((prev) => prev - amount);
    }

    const removeAllFromCart = () =>{
        setCartItems(getDefaultCart(product));
        setCartQuantity(0);
    }

    // console.log(cartItems.size)
    
    const contextValue= {removeAllFromCart, id, setId,firstname, setFirstname,lastname,setLastname,email,setEmail, jwt, setJwt, endpoint,authEndpoint,orderEndpoint,categoriesEndpoint, setCartItems,getDefaultCart, product,setProduct, cartQuantity,cartItems, addToCart, decreaseCountInCart, removeFromCart}
    
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}