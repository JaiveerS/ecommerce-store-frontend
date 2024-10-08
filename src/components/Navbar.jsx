import React, { useContext, useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import { CgShoppingCart } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import Hamburger from 'hamburger-react'
import NavbarMenu from "./NavbarMenu";
import Search from "./Search";


export default function Navbar() {

    const {setId,setFirstname, firstname, setLastname, setEmail,setJwt, cartQuantity, authEndpoint, jwt} = useContext(ShopContext)
    const navigate = useNavigate();

    function getName(){
        const instance = axios.create({
            baseURL: authEndpoint,
            timeout: 1000,
            headers: {'Authorization': 'Bearer '+jwt}
          });
          
          instance.get('/token')
          .then(response => {
              setFirstname(response.data.firstname);
              setLastname(response.data.lastname);
              setEmail(response.data.email);
              setId(response.data.id);
            //   console.log(response.data);
          })
    }

    useEffect(() => {
        if(jwt !== null && jwt !== "" && firstname === ""){
            getName();
        }
    })

    function signOut(){
        setJwt("")
        setId("")
        setFirstname("")
        navigate('/', {replace: true})
    }

    function toOrders(){
        navigate('/orders', {replace: true})
    }

    function toProfile(){
        navigate('/profile', {replace: true})
    }

    const [isOpen, setIsOpen] = useState(false);

    // function changeState(){
    //     setIsOpen(!isOpen);
    // }

    // isOpen ? disableBodyScroll(document) : enableBodyScroll(document);

    return(
        <div>
                <nav className="min-w-full bg-white flex flex-wrap items-center justify-between py-3 shadow">
                    <div className="container mx-auto flex flex-wrap items-center justify-between">
                        <div className="flex mx-auto my-auto">
                            <Hamburger color="black" toggled={isOpen} toggle={setIsOpen}/>
                            <Search />
                        </div>
                        <h1 className="flex justify-center items-center text-5xl w-1/3">                            
                            <Link className="py-2 font-semibold rounded-sm" to={"/"}>SHOP</Link>
                        </h1>
                        <ul className="flex justify-end w-1/3">
                            {jwt === null || jwt === "" ? 
                                <li key="login" className="px-2 py-2 text-lg cursor-pointer hover:bg-gray-50 rounded-md hidden md:block"><Link className="flex flex-col " to={"/login"}><FaRegUserCircle className="block mx-auto" size={25}/><p className="text-sm">Login</p></Link></li>
                                :
                                <div className="hidden md:block">
                                    <li className="peer px-2 py-2 text-lg cursor-pointer hover:bg-gray-300 rounded-md w-20"><FaRegUserCircle className="block mx-auto" size={25}/><p className="text-sm text-center">{firstname}</p></li>
                                    <div className="hidden peer-hover:flex hover:flex flex-col bg-white drop-shadow-lg cursor-pointer">
                                        <li key="profile" className="bg-white absolute py-2 px-2 w-full text-center hover:bg-gray-300 cursor-pointer" onClick={toProfile}>Profile</li>
                                        <li key="orders" className="bg-white absolute mt-10 py-2 px-2 w-full text-center hover:bg-gray-300 cursor-pointer" onClick={toOrders}>Orders</li>
                                        <li key="signout" className="bg-white absolute mt-20 py-2  px-2 w-full text-center hover:bg-red-300 cursor-pointer" onClick={signOut}>Log Out</li>
                                    </div>
                                </div>
                            }
                            <li key="cart" className="py-2 text-lg rounded-md hover:bg-gray-300 mr-6 md:mr-0"><Link className="flex py-1 px-2" to={"/cart"}><CgShoppingCart size={30}/> {cartQuantity}</Link></li>
                        </ul>
                    </div>
                </nav>
                <NavbarMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
        
    )
}

