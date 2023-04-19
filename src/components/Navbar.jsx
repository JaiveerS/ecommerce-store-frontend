import React, { useContext, useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import { CgShoppingCart } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import Hamburger from 'hamburger-react'


export default function Navbar() {

    const {setId,setJwt, cartQuantity, authEndpoint, jwt} = useContext(ShopContext)
    const {product,cartItems, setCartItems, getDefaultCart} = useContext(ShopContext)    
    const [name, setName] = useState("");
    const navigate = useNavigate();

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
            //   console.log(response.data);
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
        setId("")
        setName("")
        navigate('/', {replace: true})
    }

    function testClick(){
        navigate('/orders', {replace: true})
    }

    const [isOpen, setIsOpen] = useState(false);



    return(
        <nav className="sticky bg-white top-0 z-50 flex flex-wrap items-center justify-between py-3 shadow">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="pl-4 w-1/3">
                    <Hamburger color="black" toggled={isOpen} toggle={setIsOpen}/>
                </div>
                <h1 className="flex justify-center items-center text-5xl w-1/3">
                    <Link className=" px-2 py-2  font-semibold rounded-sm" to={"/"}>SHOP</Link>
                </h1>
                    <ul className="flex justify-end w-1/3 pr-2">
                        {jwt === null || jwt === "" ? 
                            <li className="px-2 py-2 text-lg cursor-pointer hover:bg-gray-400 rounded-md"><Link className="flex flex-col " to={"/login"}><FaRegUserCircle className="block mx-auto" size={25}/><p className="text-sm">Login</p></Link></li>
                            :
                            <div>
                                <li className="peer px-2 py-2 text-lg cursor-pointer hover:bg-gray-400 rounded-md"><Link className="flex flex-col" to={"/userinfo"}><FaRegUserCircle className="block mx-auto" size={25}/><p className="text-sm">{name}</p></Link></li>
                                <div className="hidden peer-hover:flex hover:flex flex-col bg-white drop-shadow-lg cursor-pointer">
                                    {/* <ul class="px-2 py-2 hover:bg-gray-400 cursor-pointer" >Orders</ul> */}
                                    <ul className="bg-white absolute py-2 px-2 w-full text-center hover:bg-gray-400 cursor-pointer" onClick={testClick}>Orders</ul>
                                    <ul className="bg-white absolute mt-10 py-2  px-2 w-full text-center hover:bg-red-300 cursor-pointer" onClick={signOut}>Log Out</ul>
                                </div>
                                </div>
                        }
                        <li className="py-2 pr-2 text-lg"><Link className="flex" to={"/cart"}><CgShoppingCart size={30}/> {cartQuantity}</Link></li>
                    </ul>
            </div>
        </nav>
    )
}

