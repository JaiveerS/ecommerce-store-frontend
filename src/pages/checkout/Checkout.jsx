import React, { useContext } from "react"
import { ShopContext } from "../../context/ShopContext";
import OrderMiniSummary from "./OrderMiniSummary";
import { useNavigate } from "react-router-dom";


export default function Checkout(){
    const {cartItems, product, cartQuantity, jwt} = useContext(ShopContext);
    var total = 0;
    const navigate = useNavigate();


    function handleOnClick(event){
        if(jwt !== null && jwt !== ""){
            console.log("im going to check all inputs and place your order now")
        }else{
            navigate('/login', {replace: true});
        }
    }

    return (
        <div className="flex pt-5 min-h-screen">
            <div>
            </div>
            <div className="flex mx-auto">
                <form className="space-y-4 md:space-y-6 pl-2" action="#">
                    <div className="">
                        <h1>Shipping Address </h1>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Full name (First and Last Name)</label>
                            <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="firstname lastname" required=""/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Phone #</label>
                            <input type="number" name="phonenumber" id="phonenumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="***-***-****" required=""/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                            <input type="name" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Address" required=""/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">City</label>
                            <input type="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="City" required=""/>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Province</label>
                                <input type="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Province" required=""/>
                            </div>
                            <div className="flex flex-col justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Postal Code</label>
                                <input type="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Postal Code" required=""/>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h1>Payment Method</h1>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Credit Card Number</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="*** *** ****" required=""/>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Name on Card</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="****** *****" required=""/>
                            </div>
                            <div className="flex flex-col justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Expiration Date</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="**/**" required=""/>
                            </div>
                            <div className="flex flex-col justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">CCV</label>
                                <input type="email" name="email" id="email" className="align-bottom bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="***" required=""/>
                            </div>
                        </div>
                    </div>
                </form>


                <div className="min-w-fit pl-2">
                    <h1 className="pl-2 pb-2">Order Summary:</h1>
                    {product.map((product) => {//change to checkout products where its just a order summary
                            if(cartItems.get(product.id) !== 0){
                                total += cartItems.get(product.id) * product.price;
                                return <OrderMiniSummary key={product.id} data={product} extra={cartItems.get(product.id)}/>
                            }
                            return ""
                        }
                    )
                    }
                    {cartQuantity > 0 && (
                    <div>
                        <hr className="divide-solid mt-3"></hr>
                        <h3 className="text-xl font-bold mr-4 mb-4 pt-5 text-right" value="true">Total = ${total}</h3>
                        <button onClick={handleOnClick} className="float-right px-6 mr-3 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none">Place Your Order</button>
                    </div>)}
                </div>
            </div>
        </div>
    )
}