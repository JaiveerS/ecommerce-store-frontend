import React, { useContext, useEffect, useState}  from "react";
import axios from "axios";
import {ShopContext} from "../../context/ShopContext";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';


const stripePromise = loadStripe("pk_test_51MygPJFUjGSVabd8a7xPT0k0OcEaiDupWSfwH6s5sZRrW5va9qHo74gCYMKy44vFM1CAcDAaekHCHPHUQ4UvapOT00WAqD1Z9o")

export default function StripeCheckout(body){
  const {jwt,baseEndpoint} = useContext(ShopContext);
  const [options, setOptions] = useState("");
  const [error, setError] = useState("");


  

  function getClientSecret (){
    // console.log("fetching");

    const fetch = axios.create({
      baseURL: baseEndpoint,
      headers: {'Authorization': 'Bearer '+jwt}
    }) 

    fetch.post("/api/checkout/hosted", body.body).then((response)=>{
      setOptions(response.data).catch(error => setError(error.response.data))
    })

  }

  useEffect(() =>{
    // console.log("changed");
    // console.log(body.body.orderItems)
    if(body.body.orderItems.length > 0){
      getClientSecret();
    }
  }, [body.body.orderItems]);

  return(
    <div>
      {/* {options === "" ? getClientSecret() : ""} */}
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      {error}
    </div>
  )
}