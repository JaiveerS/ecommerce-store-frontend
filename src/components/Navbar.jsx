import React from "react";
import {Link} from 'react-router-dom';

export default function Navbar() {
    return(
        <nav className="bg-yellow-300 sticky top-0 z-50 flex flex-wrap items-center justify-between px-2 py-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <h1 className="px-2 text-5xl">
                    <Link to={"/"}>Shop</Link>
                </h1>
                <ul className="flex">
                    <li className="px-2 text-lg"><Link to={"/login"}>Login</Link></li>
                    <li className="px-2 text-lg"><Link to={"/cart"}>Cart</Link></li>
                </ul>
            </div>
        </nav>
    )
}