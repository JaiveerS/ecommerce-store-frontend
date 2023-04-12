import React, { useContext, useState } from "react"
import { ShopContext } from "../../context/ShopContext";
import OrderMiniSummary from "./OrderMiniSummary";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Checkout(){
    const {cartItems, product, cartQuantity, jwt, orderEndpoint} = useContext(ShopContext);
    const cartProducts = [];
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    var total = 0;
    const navigate = useNavigate();

    const [fullname, setFullname] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");

    function handleChangeFullname(event){
        setFullname(event.target.value)
        console.log(event.target.value)
    }

    function handleChangePhonenumber(event){
        setPhonenumber(event.target.value)
        console.log(event.target.value)
    }

    function handleChangeAddress(event){
        setAddress(event.target.value)
        console.log(event.target.value)
    }

    function handleChangeCity(event){
        setCity(event.target.value)
        console.log(event.target.value)
    }

    function handleChangeProvince(event){
        setProvince(event.target.value)
        console.log(event.target.value)
    }

    function handleChangePostalCode(event){
        setPostalCode(event.target.value)
        console.log(event.target.value)
    }

    //TODO get userID when we log in then save in context to send here.
    const body = {userId: 1 ,fullName: fullname, phoneNumber: phonenumber, address: address , city: city, province:province, postalCode: postalCode, orderItems: cartProducts}

    function handleOnClick(event){
        event.preventDefault()
        if(jwt !== null && jwt !== ""){
            const instance = axios.create({
                baseURL: orderEndpoint,
                timeout: 1000,
                headers: {"Authorization": "Bearer " + jwt}
              });

            instance.post("/order", body)
            .then(response => setResponse(response)).catch(error => setError("Cannot Place Order"));

        }else{
            navigate('/login', {replace: true});
        }
    }

    return (
        <div className="flex pt-5 min-h-screen">
            <form className="space-y-4 md:space-y-6 pl-2 pr-2 mx-auto" action="#">
                <div className="flex pl-2">
                    <div>
                        <div className="max-w-md">
                            <h1 className="font-semibold">Shipping Address </h1>
                            <div className="pt-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                                <input onChange={handleChangeFullname} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Full name" required/>
                            </div>
                            <div className="pt-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Phone #</label>
                                <input onChange={handleChangePhonenumber} type="phone" name="phonenumber" id="phonenumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="***-***-****" required/>
                            </div>
                            <div className="pt-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                                <input onChange={handleChangeAddress} type="name" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Address" required/>
                            </div>
                            <div className="pt-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900">City</label>
                                <input onChange={handleChangeCity} type="text" name="city" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="City" required/>
                            </div >
                            <div className="flex pt-2">
                                <div className="flex flex-col justify-between pr-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Province</label>
                                    <input onChange={handleChangeProvince} type="text" name="province" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Province" required/>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Postal Code</label>
                                    <input onChange={handleChangePostalCode} type="text" name="postal" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Postal Code" required/>
                                </div>
                            </div>
                        </div>


                        <div className="max-w-md">
                            <h1 className="font-semibold">Payment Method</h1>
                            <div className="pt-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Credit Card Number</label>
                                <input type="text" name="ccNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="*** *** ****" required/>
                            </div>
                            <div className="flex flex-col justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Name on Card</label>
                                <input type="text" name="nameOnCard" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="****** *****" required/>
                            </div>
                            <div className="flex pt-2 pb-5">
                                <div className="flex flex-col justify-between pr-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Expiration Date</label>
                                    <input type="text" name="expiration" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="**/**" required/>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">CCV</label>
                                    <input type="text" name="ccv" className="align-bottom bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="***" required/>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="min-w-fit pl-2 pr-4">
                        <h1 className="font-bold">Order Summary</h1>
                        <hr className="divide-solid mt-3 pb-2"></hr>
                        {product.map((product) => {
                                if(cartItems.get(product.id) !== 0){
                                    total += cartItems.get(product.id) * product.price;
                                    cartProducts.push({productId: product.id, productName: product.productName, price: product.price, quantity: cartItems.get(product.id)});
                                    return <OrderMiniSummary key={product.id} data={product} extra={cartItems.get(product.id)}/>
                                }
                                return ""
                            }
                        )
                        }
                        {cartQuantity === 0 || jwt === null || jwt === "" ?  navigate('/cart', {replace: true}) : ""}
                        {cartQuantity > 0 && (
                        <div>
                            <hr className="divide-solid mt-3"></hr>
                            <h3 className="text-xl font-bold mr-4 mb-4 pt-5 text-right" value="true">Total = ${total}</h3>
                            <button onClick={handleOnClick} className="float-right px-6 mr-3 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none">Place Your Order</button>
                            {response.status === 200 ? (navigate('/success', {replace: true})) : ""}
                        </div>)}
                        <p className="text-red-600 font-bold">{error}</p>
                    </div>
                </div>
            </form>
        </div>
    )
}