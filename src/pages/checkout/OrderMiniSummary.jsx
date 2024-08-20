import React, {useContext} from "react";
import { ShopContext } from "../../context/ShopContext";


export default function OrderMiniSummary(props){
    const {id,productName,price,description,image} = props.data
    const count = props.extra
    const {removeFromCart} = useContext(ShopContext)


    return(
        <div className="flex mx-auto">
            <img className=" h-20 w-20 object-contain rounded-lg" alt={description} src={image}/>
            <div className="flex flex-col">
                <p className="font-semibold">{productName}</p>
                <p className="text-sm">Price: ${price}</p>
                <p className="text-sm">Quantity: {count}</p>
                <div>
                    <div className="pb-2 justify-start lowercase hover:text-red-700 hover:underline focus:outline-none text-sm cursor-pointer" onClick={() => removeFromCart(id)}>Remove</div>
                </div>
            </div>
        </div>
    )
}