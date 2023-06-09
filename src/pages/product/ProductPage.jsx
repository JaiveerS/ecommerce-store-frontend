import React, { useState, useContext} from "react";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";



export default function ProductPage(props) {
    let path = window.location.pathname.split('/')
    const id = parseInt(path[2]);

    const {addToCart, cartItems, endpoint} = useContext(ShopContext)
    const [product, setProduct] = useState([])

    const thisEndpoint = endpoint + "/" + id;
    const cartItemAmount = cartItems.get(id);

    function getProducts (){
        axios.get(thisEndpoint).then((response)=> {
            setProduct(response.data)
        })
    }

    return (
        <div className="min-h-screen">
        {product.length === 0 ? getProducts() : ""}
        {product.price > 0 && (
        <div className="flex justify-center flex-wrap">
            <img className="object-fit h-96 mt-5 -mb-10" alt={product.description} src={product.image}/>
                <div className="px-10">
                    <h1 className="pt-10 pb-5 font-semibold">{product.productName}</h1>
                    <h3 className="py-1">Price: ${product.price}</h3>
                    <h4 className="py-2">Category: {product.category}</h4>
                    <p  className="py-2 max-w-md">{product.description}</p>
                    <div className="flex py-4">
                        <button onClick={() => addToCart(id)} className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none">
                            Add To Cart{cartItemAmount > 0 && <>| {cartItemAmount} </>}
                        </button>
                    </div>
                </div>
        </div>
        )}
        </div>
    )
}