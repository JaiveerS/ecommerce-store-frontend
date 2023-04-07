import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import CartItem from "./CartItem";

export default function Cart() {

    const {cartItems, product, cartQuantity, jwt} = useContext(ShopContext)

    const navigate = useNavigate();

    var total = 0;

    function handleOnClick(){//maybe add a validate jwt to backend
        if(jwt === null || jwt === ""){
            navigate('/login', {replace: true});
        }else{
            navigate('/checkout', {replace: true});
        }

    }

    return (
        <div className="bg-white flex justify-center items-center">
        <div className="min-h-screen">
            <div>
                <h1 className="text-3xl font-bold mb-6 pt-10 text-center">{cartQuantity  > 0 ? 'Shoping Cart' : 'Your Cart is empty.'}</h1>
                <Link className="hover:underline hover:font-bold text-center" to={"/"}>{cartQuantity  === 0 && ('start shopping')}</Link>
            </div>
            <div>
                {product.map((product) => {
                        if(cartItems.get(product.id) !== 0){
                            total += cartItems.get(product.id) * product.price;
                            return <CartItem key={product.id} data={product} extra={cartItems.get(product.id)}/>
                        }
                        return ""
                    }
                )
                }
                {cartQuantity > 0 && (
                <div>
                    <hr className="divide-solid mt-3"></hr>
                    <h3 className="text-3xl font-bold mr-4 mb-6 pt-10 text-right" value="true">Total = ${total}</h3>
                    <button onClick={handleOnClick} className="float-right px-6 mr-3 py-2 mb-5 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none ">Checkout</button>
                </div>)}
            </div>
        </div>
        </div>
    )
}