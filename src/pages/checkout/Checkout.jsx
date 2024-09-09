import React, { useContext, useEffect} from "react"
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "./StripeCheckout";


export default function Checkout(){

    const {id, cartItems, product, jwt} = useContext(ShopContext);
    const cartProducts = [];
    const navigate = useNavigate();


    useEffect(() => {
        if (jwt === null || jwt === ""){
            navigate('/', {replace: true})
        }
    })

    const body = {userId: id, orderItems: cartProducts}

    return (
        <div className="min-h-screen">
            {product.map((product) => {
            if(cartItems.has(product.id)){
                cartProducts.push({productId: product.id, productName: product.productName, price: product.price, quantity: cartItems.get(product.id)});
            }
            return "";
                    }
                )
            }

            {/* {console.log(body)} */}
            <StripeCheckout body={body} />
        </div>
    )
}