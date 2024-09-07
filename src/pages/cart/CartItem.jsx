import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import image_not_found from "../../assets/image_not_found.png"

export default function CartItem(props){
    const {id,productName,price,description,image} = props.data
    const count = props.extra
    const {addToCart, decreaseCountInCart, removeFromCart} = useContext(ShopContext)


    return(
        <div>
            <div className="flex justify-evenly items-center px-4">
                <Link to={'/product/' + id}><img className="w-52 object-contain max-h-40 rounded-lg" alt={description} src={image} onError={(e) => { e.target.src ={image_not_found}}} 
                /></Link>
                <div className="flex flex-col px-5">
                    <h1 className="text-center py-2 font-semibold">{productName}</h1>
                    <h3 className="text-center">Price: ${price}.00</h3>
                </div>
                <div className="flex flex-col justify-end">
                    <div className="flex flex-row justify-center py-5">
                        <button className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-red-600 hover:text-white border-2 border-gray-900 focus:outline-none" onClick={() => decreaseCountInCart(id)}>-</button>
                        <p className="text-center px-6 py-2 ">{count}</p>
                        <button className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none" onClick={() => addToCart(id)}>+</button>
                    </div>
                    <button className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-red-600 hover:text-white border-2 border-gray-900 focus:outline-none" onClick={() => removeFromCart(id)}>Remove</button>
                </div>
            </div>
            <hr className="divide-solid my-3"></hr>
        </div>
    )
}