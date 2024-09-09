import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
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
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold mb-2 pt-10 text-center">{cartQuantity  > 0 ? 'Shopping Cart' : 'Your Cart is empty.'}</h1>
                {cartQuantity === 0 ? 
                    <button onClick={() => navigate("/", {replace:true})} className="bg-transparent hover:bg-blue-50 text-blue-700 font-semibold  py-2 px-4 border border-blue-500 rounded self-center">
                        Continue Shopping
                    </button>
                    : <hr className="divide-solid mt-3"></hr>
                }
                {/* <Link className="hover:underline hover:font-bold text-center" to={"/"}>{cartQuantity  === 0 && ('start shopping')}</Link> */}
            </div>
            <div className="lg:space-y-0">

                {/* {cartItems.map(item => {
                    return <CartItem key ={product[item.id]} data ={product[item.id]} extra={CartItem.id}/>
                })} */}
{/* 
                {cartItems.array.forEach(([key, value]) => {
                    <p>key</p>
                })} */}

                {product.map((product) => {
                        if(cartItems.has(product.id)){
                            total += product.price * cartItems.get(product.id);
                            return <CartItem key={product.id} data={product} extra={cartItems.get(product.id)}/>
                        }
                        return ""
                    }
                )
                }
                {cartQuantity > 0 && (
                <div>
                    <h3 className="text-3xl font-bold mr-4 mb-6 pt-10 text-right" value="true">Subtotal = ${total}.00</h3>
                    <button onClick={handleOnClick} className="float-right px-6 mr-3 py-2 mb-5 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none ">Checkout</button>
                </div>)}
            </div>
        </div>
        </div>
    )
}