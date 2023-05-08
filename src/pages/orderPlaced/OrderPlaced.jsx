import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import Orders from "./Orders";


export default function OrderPlaced(){
    const {orderEndpoint, id, jwt} = useContext(ShopContext);
    const [orders, setOrders] = useState([]);

    function getOrders (){
        const instance = axios.create({
            baseURL: orderEndpoint,
            timeout: 1000,
            headers: {'Authorization': 'Bearer '+ jwt}
          });

        instance.get("/" + id)
        .then(response => setOrders(response.data));
    }
    return(
        <div className="flex min-h-screen flex-col max-w-screen-lg m-auto">
            {/* <h1 className="text-center text-8xl py-10">ORDER PLACED</h1> */}
            {orders.length === 0 ? getOrders() : ""}
            {orders.map((item => (
                <Orders data={item}/>
            ))).reverse()}
            {orders.length === 0 && jwt !== "" ? <div className="p-20 font-extrabold text-5xl text-center">No Orders Placed</div> : ""}
        </div>
    )
}