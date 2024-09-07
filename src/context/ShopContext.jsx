import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
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
    // shop-backend-v1-production.up.railway.
    // const baseEndpoint = "http://localhost:8080"
    // const endpoint = "http://localhost:8080/api/products";
    // const authEndpoint = "http://localhost:8080/api/auth";
    // const orderEndpoint = "http://localhost:8080/api/orders";
    // const categoriesEndpoint = "http://localhost:8080/api/categories";
    const baseEndpoint = "http://129.153.49.68:8080";
    const endpoint = "http://129.153.49.68:8080/api/products";
    const authEndpoint = "http://129.153.49.68:8080/api/auth";
    const orderEndpoint = "http://129.153.49.68:8080/api/orders";
    const categoriesEndpoint = "http://129.153.49.68:8080/api/categories";


    const [id, setId] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [jwt, setJwt] = useState("");
    const [cartQuantity, setCartQuantity] = useState(0);
    const [product, setProduct] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart(product));

    useEffect(() => {
        const storedId = sessionStorage.getItem('id');
        const storedFirstname = sessionStorage.getItem('firstname');
        const storedLastname = sessionStorage.getItem('lastname');
        const storedEmail = sessionStorage.getItem('email');
        const storedJwt = sessionStorage.getItem('jwt');
        // const storedCartQuantity = sessionStorage.getItem('cartQuantity');
        // const storedProduct = sessionStorage.getItem('product')
        // const storedCartItems = sessionStorage.getItem('cartItems');

        // console.log(storedProduct);
        // console.log(storedCartItems);

        if (storedId) setId(storedId);
        if (storedFirstname) setFirstname(storedFirstname);
        if (storedLastname) setLastname(storedLastname);
        if (storedEmail) setEmail(storedEmail);
        if (storedJwt) setJwt(storedJwt);
        // if (storedCartQuantity) setCartQuantity(Number(storedCartQuantity));
        // if (storedProduct) setProduct(JSON.parse(storedProduct));
        // if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
    }, []);


    useEffect(() => {
        sessionStorage.setItem('id', id);
    },[id])

    useEffect(() => {
        sessionStorage.setItem('firstname', firstname);
    },[firstname])

    useEffect(() => {
        sessionStorage.setItem('lastname', lastname);
    },[lastname])

    useEffect(() => {
        sessionStorage.setItem('email', email);
    },[email])

    useEffect(() => {
        sessionStorage.setItem('jwt', jwt);
        // console.log("changed jwt");
        // console.log(jwt);
    },[jwt])

    useEffect(() => {
        sessionStorage.setItem('cartQuantity', cartQuantity);
    },[cartQuantity])

    useEffect(() => {
        sessionStorage.setItem('product', JSON.stringify(product));
    },[product])

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    },[cartItems])




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


    const getProducts = () => {
        axios.get(endpoint).then((response)=> {
            setProduct(response.data._embedded.productList)
        })
    }




    // console.log(cartItems.size)
    
    const contextValue= {removeAllFromCart,
        product,setProduct, getProducts,
        id, setId,
        firstname, setFirstname,
        lastname,setLastname,
        email,setEmail,
        jwt, setJwt,
        endpoint,authEndpoint,orderEndpoint,categoriesEndpoint,baseEndpoint,
        setCartItems,getDefaultCart,
        cartQuantity,cartItems,
        addToCart, decreaseCountInCart, removeFromCart}
    
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}