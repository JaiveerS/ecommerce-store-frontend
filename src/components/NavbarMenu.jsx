import axios from "axios";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Hamburger from "hamburger-react"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";

export default function NavbarMenu(props) {
    const {isOpen, setIsOpen} = props;
    const {categoriesEndpoint, jwt, setJwt, setId} = useContext(ShopContext);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [isCategoryOpen, setCategoryOpen] = useState(true);


    function changeState(){
        setIsOpen(!isOpen);
    }

    function getCategories(){
        axios.get(categoriesEndpoint).then((response)=> {
            // console.log(response.data)
            setCategories(response.data)
        })
    }

    function signOut(){
        setJwt("")
        setId("")
        navigate('/', {replace: true})
        changeState()
    }

    function changeCategoryStatus(){
        setCategoryOpen(!isCategoryOpen)
    }


    isOpen ? disableBodyScroll(document) : enableBodyScroll(document);
    
    return(
        <div className={isOpen ? "navbar-menu relative z-50 block" : "hidden"}>
        <div onClick={changeState} className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
                <Hamburger color="black" toggled={isOpen} toggle={setIsOpen}/>
            </div>
            <div className="overflow-y-scroll pb-40">
                {categories.length === 0 ? getCategories() : ""}
                <ul>
                    <li key="home" className="mb-1">
                        <Link to={"/"} onClick={changeState} className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Home</Link>
                    </li>
                    <li key="dropdown" className="mb-1">
                        <p className="block p-4 text-sm font-semibold text-gray-400 rounded cursor-pointer  hover:bg-blue-50 hover:text-blue-600" onClick={changeCategoryStatus}>Categories</p>
                            { isCategoryOpen ?
                            <div>
                                {categories.map((item => (
                                    <ul key={item} className="block px-4">
                                        <Link to={"/category/" + item} onClick={changeState} className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">{item}</Link>
                                    </ul>
                                )))}                        
                            </div>
                            : ""}
                    </li>
                    {/* <li className="mb-1">
                        <Link to={"/cart"} onClick={changeState} className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Cart</Link>
                    </li> */}
                    {jwt === "" ?
                    <div className="absolute bottom-2 w-72">
                        <div className="">
                            <Link to={"/login"} onClick={changeState} className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl">Sign in</Link>
                            <Link to={"/signup"} onClick={changeState} className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl">Sign Up</Link>
                        </div>
                    </div>
                    : 
                    <div>
                        <li className="absolute bottom-2 w-72 bg-white">
                            <Link to={"/profile"} onClick={changeState} className="block px-4 py-2 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl">Profile</Link>
                            <Link to={"/orders"} onClick={changeState} className="block px-4 py-2 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl">Orders</Link>
                            <ul className="block px-4 py-2 mb-2 leading-loose text-xs text-center text-white font-semibold bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer" onClick={signOut}>Log Out</ul>
                        </li>
                    </div>
                    }
                </ul>
            </div>
            {/* <div className="mt-auto">
                <div className="pt-6">
                    <Link to={"/login"} onClick={changeState} className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl">Sign in</Link>
                    <Link to={"/signup"} onClick={changeState} className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl">Sign Up</Link>
                </div>
                <p className="my-4 text-xs text-center text-gray-400">
                    <span>Copyright © {new Date().getFullYear()}</span>
                </p>
            </div> */}
        </nav>
    </div>
    )

}