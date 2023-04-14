import React, { useContext, useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import { CgShoppingCart } from "react-icons/cg";
import axios from "axios";


export default function Navbar() {

    const {setId,setJwt, cartQuantity, authEndpoint, jwt} = useContext(ShopContext)
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

    function signOut(){
        setJwt("")
        window.scrollTo(0,0);
    }



    return(
        <nav className="sticky bg-white top-0 z-50 flex flex-wrap items-center justify-between px-2 py-3 shadow">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <h1 className="px-2 text-5xl">
                    <Link to={"/"}>shop</Link>
                </h1>
                <ul className="flex">
                    {jwt === null || jwt === "" ? 
                        <li className="px-2 text-lg cursor-pointer"><Link to={"/login"}>Login</Link></li>
                            :
                        <div>
                            <li className="peer px-2 text-lg cursor-pointer">{name}</li>
                            <div className="hidden peer-hover:flex hover:flex
                            flex-col bg-white drop-shadow-lg cursor-pointer">
                                {/* <ul class="px-2 py-2 hover:bg-gray-400 cursor-pointer" >Orders</ul> */}
                                <ul className="bg-white absolute px-2 py-2 hover:bg-gray-400 cursor-pointer" onClick={signOut}>Log Out</ul>
                            </div>
                            </div>
                    }

                    <li className="px-2 text-lg hover:animate-pulse"><Link className="flex" to={"/cart"}><CgShoppingCart size={30}/> {cartQuantity}</Link></li>
                </ul>
            </div>
        </nav>
    )
}

