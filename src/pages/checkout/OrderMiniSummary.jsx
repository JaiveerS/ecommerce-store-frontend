import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";


export default function OrderMiniSummary(props){
    const {id,productName,price,description,image} = props.data
    const count = props.extra
    const {addToCart, decreaseCountInCart, removeFromCart} = useContext(ShopContext)


    return(
        <div className="flex mx-auto">
            <img className=" h-20 object-fit rounded-lg" alt={description} src={image}/>
            <div className="flex flex-col">
                <p className="">{productName}</p>
                <p className="">Price: ${price}</p>
                <p className="">quantity: {count}</p>
                <div>
                <button className="px-1 justify-start lowercase hover:text-gray-500 hover:underline focus:outline-none text-sm" onClick={() => removeFromCart(id)}>Remove</button>
                </div>
            </div>
        </div>
    )
}