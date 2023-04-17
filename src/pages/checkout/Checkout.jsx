import React, { useContext, useEffect, useState } from "react"
import { ShopContext } from "../../context/ShopContext";
import OrderMiniSummary from "./OrderMiniSummary";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../../components/FormInput";


export default function Checkout(){
        const [values, setValues] = useState(
        {
            fullName: "",
            phoneNumber: "", 
            address: "", 
            city: "",
            province: "", 
            postalCode: ""
        })

    const input = 
    [
        {
            id:1,
            name: "fullName",
            type: "text",
            placeholder: "Fullname",
            title: "Fullname must be a valid name",
            label: "Fullname",
            pattern: "^([a-zA-Z'-.]+ [a-zA-Z'-.]+)$",
            required: true
        },
        {
            id:2,
            name: "phoneNumber",
            type: "text",
            placeholder: "Phone Number",
            title: "Must be a valid phone number",
            label: "Phone Number",
            pattern: '^(?:+?[0-]9{2}[ -]?[0-9]{3}[ -]?[0-9]{5}|[0-9]{4})$',
            required: true
        },
        {
            id:3,
            name: "address",
            type: "text",
            placeholder: "Address",
            title: "Must be a valid address",
            label: "Address",
            pattern: "^[a-zA-Z0-9   ,'-]*$",
            required: true
        },
        {
            id:4,
            name: "city",
            type: "city",
            placeholder: "City",
            title: "Must be a valid city",
            label: "City",
            pattern: "^[a-zA-Z  -]+$",
            required: true
        },
        {
            id:5,
            name: "province",
            type: "province",
            placeholder: "Province",
            title: "Must be a valid province",
            label: "Province",
            pattern: "^[a-zA-Z  -]+$",
            required: true
        },
        {
            id:6,
            name: "postalCode",
            type: "postalcode",
            placeholder: "Postal Code",
            title: "Must be a valid Postal Code",
            label: "Postal Code",
            pattern: "[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]",
            required: true
        }
    ]

    const {removeAllFromCart, id, cartItems, product, cartQuantity, jwt, orderEndpoint} = useContext(ShopContext);
    const cartProducts = [];
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    var total = 0;
    const navigate = useNavigate();

    const body = {userId: id ,fullName: values.fullName, phoneNumber: values.phoneNumber, address: values.address , city: values.city, province: values.province, postalCode: values.postalCode, orderItems: cartProducts}

    function handleSubmit(event){
        event.preventDefault()
        if(jwt !== null && jwt !== ""){
            const instance = axios.create({
                baseURL: orderEndpoint,
                timeout: 1000,
                headers: {'Authorization': 'Bearer '+ jwt}

              });

            instance.post("/order", body)
            .then(response => setResponse(response)).catch(error => setError("Cannot Place Order"));
            // .then(response => setResponse(response)).catch((error) => console.log(error));


        }else{
            navigate('/login', {replace: true});
        }
    }

    const handleChange = (e) => 
    {
        setValues({...values, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if (response.status === 200){
            navigate('/orders', {replace: true})
            removeAllFromCart()

        }
        if (cartQuantity === 0 || jwt === null || jwt === ""){
            navigate('/cart', {replace: true})
        }
    })

    return (
        <div className="flex pt-5 min-h-screen">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 pl-2 pr-2 mx-auto">
                <div className="flex pl-2 flex-wrap">
                    <div>
                        <div className="max-w-md">
                            <h1 className="font-semibold">Shipping Address </h1>

                            {input.map((input) => (
                                <FormInput key={input.id} {...input} value={values[input.name]} onChange={handleChange}/>
                            ))}
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


                    <div className="min-w-fit pl-2 pr-4 pb-5">
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
                        {/* {cartQuantity === 0 || jwt === null || jwt === "" ?  navigate('/cart', {replace: true}) : ""} */}
                        {cartQuantity > 0 && (
                        <div>
                            <hr className="divide-solid mt-3"></hr>
                            <h3 className="text-xl font-bold mr-4 mb-4 pt-5 text-right" value="true">Total = ${total}</h3>
                            <button type="submit" className="float-right px-6 mr-3 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none">Place Your Order</button>
                            {/* {response.status === 200 ? (navigate('/orders', {replace: true})) : ""} */}
                        </div>)}
                        <p className="text-red-600 font-bold">{error}</p>
                    </div>
                </div>
            </form>
        </div>
    )
}