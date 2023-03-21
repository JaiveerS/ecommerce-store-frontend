import React, {useContext} from "react";
import { ShopContext } from "../../context/ShopContext";


export default function CartItem(props){
    const {id,product_name,price,description,image} = props.data
    const count = props.extra
    const {addToCart, decreaseCountInCart, removeFromCart} = useContext(ShopContext)


    return(
        <div className="bg-white flex justify-center py-5 items-center">
            <img className=" h-80 w-72 object-cover rounded-lg" alt={description} src={image}/>
            <div className="flex flex-col px-5">
                <h1 className="text-center py-2">{product_name}</h1>
                <h3 className="text-center">Price: ${price}</h3>
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-center py-5">
                    <button className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-red-600 hover:text-white border-2 border-gray-900 focus:outline-none" onClick={() => decreaseCountInCart(id)}>-</button>
                    <p className="text-center px-6 py-2 ">{count}</p>
                    <button className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none" onClick={() => addToCart(id)}>+</button>
                </div>
                <button className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-red-600 hover:text-white border-2 border-gray-900 focus:outline-none" onClick={() => removeFromCart(id)}>Remove</button>
            </div>
        </div>
    )
}