import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import {ShopContext} from "../../context/ShopContext";
// import ProductPage from "../product/ProductPage";

export default function Product(props){

    const {id,price,category,description,image, productName} = props.data
    const {addToCart, cartItems} = useContext(ShopContext)

    const cartItemAmount = cartItems.get(id);

    return(
        <div className="bg-white w-80">
            <Link to={'/product/' + id}>
                <img className=" h-80 w-72 object-cover" alt={description} src={image}/>
            </Link>
                <h1 className="text-center py-2">{productName}</h1>
                <h3 className="text-center">Price: ${price}</h3>
                {/* <h4 className="text-center py-2">Category: {category}</h4> */}
                {/* <p  className="text-center">{description}</p> */}
                <div className=" flex justify-center py-4">
                    <button onClick={() => addToCart(id)} className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none">
                        Add To Cart{cartItemAmount > 0 && <>| {cartItemAmount} </>}
                    </button>
                </div>
        </div>
    )
}