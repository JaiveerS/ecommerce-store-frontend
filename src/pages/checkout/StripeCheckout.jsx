import axios from "axios";
import Stripe from "react-stripe-checkout";
import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

export default function StripeCheckout(){
    const {jwt} = useContext(ShopContext)

    async function handleToken(token) {
        console.log(token);
        await axios.post("http://localhost:8080/api/orders/charge", "", {
            headers: {
            'Authorization': 'Bearer '+ jwt,
            timeout: 1000,
            token: token.id,
            amount: 500,
        },}).then(() => {
           alert("Payment Success");
           }).catch((error) => {
           alert(error);
           });
        }

    return(
        <div>
            <Stripe
                stripeKey="pk_test_51MygPJFUjGSVabd8a7xPT0k0OcEaiDupWSfwH6s5sZRrW5va9qHo74gCYMKy44vFM1CAcDAaekHCHPHUQ4UvapOT00WAqD1Z9o"
                token={handleToken}
                amount={5000}
                theme = 'stripe'
            />
        </div>
    )
}