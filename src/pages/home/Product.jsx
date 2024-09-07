import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import {ShopContext} from "../../context/ShopContext";
// import ProductPage from "../product/ProductPage";
import image_not_found from "../../assets/image_not_found.png"

export default function Product(props){

    const {id,price,description,image, productName} = props.data
    const {addToCart, cartItems} = useContext(ShopContext)

    const cartItemAmount = cartItems.get(id);

    return(
        <div className="bg-white w-100">
            <Link className="w-max" to={'/product/' + id}>
                <img className="object-contain w-80 h-80 hover:opacity-75" alt={description} src={image} onError={(e) => { e.target.src ={image_not_found}}}/>
            </Link>
                <h1 className="text-center py-2 font-semibold">{productName}</h1>
                <h3 className="text-center">Price: ${price}.00</h3>
                <div className=" flex justify-center py-4">
                    <button onClick={() => addToCart(id)} className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none">
                        Add To Cart{cartItemAmount > 0 && <>| {cartItemAmount} </>}
                    </button>
                </div>
        </div>
    )
}