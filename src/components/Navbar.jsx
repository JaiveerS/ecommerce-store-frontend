import React, { useContext, useEffect } from "react";
import {Link} from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import { CgShoppingCart } from "react-icons/cg";
import axios from "axios";


export default function Navbar() {

    const {cartQuantity, endpoint, jwt} = useContext(ShopContext)
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

    return(
        <nav className="bg-slate-400 top-0 z-50 flex flex-wrap items-center justify-between px-2 py-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <h1 className="px-2 text-5xl">
                    <Link to={"/"}>TheTrove</Link>
                </h1>
                <ul className="flex">
                    {jwt === null || jwt === "" ? <li className="px-2 text-lg"><Link to={"/login"}>Login</Link></li>: "username here"}
                    <li className="px-2 text-lg"><Link className="flex" to={"/cart"}><CgShoppingCart size={30}/> {cartQuantity}</Link></li>
                </ul>
            </div>
        </nav>
    )
}

