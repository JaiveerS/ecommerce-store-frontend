import React, { useContext, useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import { CgShoppingCart } from "react-icons/cg";
import axios from "axios";


export default function Navbar() {

    const {setId, cartQuantity, authEndpoint, jwt} = useContext(ShopContext)
    const {product,cartItems, setCartItems, getDefaultCart} = useContext(ShopContext)    
    const [name, setName] = useState("");


    function getName(){
        const instance = axios.create({
            baseURL: authEndpoint,
            timeout: 1000,
            headers: {'Authorization': 'Bearer '+jwt}
          });
          
          instance.get('/token')
          .then(response => {
              setName(response.data.firstname);
              setId(response.data.id);
              console.log(response.data);
          })
    }

    useEffect(() => {
        if(jwt !== null && jwt !== "" && name === ""){
            getName();
        }
        if (cartItems.size !== product.length){
            setCartItems(getDefaultCart(product))
        }
    })



    return(
        <nav className=" top-0 z-50 flex flex-wrap items-center justify-between px-2 py-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <h1 className="px-2 text-5xl">
                    <Link to={"/"}>shop</Link>
                </h1>
                <ul className="flex">
                    {jwt === null || jwt === "" ? <li className="px-2 text-lg"><Link to={"/login"}>Login</Link></li>: name}
                    <li className="px-2 text-lg hover:animate-pulse"><Link className="flex" to={"/cart"}><CgShoppingCart size={30}/> {cartQuantity}</Link></li>
                </ul>
            </div>
        </nav>
    )
}

