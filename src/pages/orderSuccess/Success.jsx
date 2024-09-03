import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";

export default function OrderSuccess(){
    const location = useLocation();
    const {jwt, baseEndpoint} = useContext(ShopContext);
    const queryParams = new URLSearchParams(location.search);
    const session = queryParams.get('session_');
    const [response, setResponse] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [timer, setTimer] = useState(5);


  function saveOrder (){
    console.log("in save order");
    

    const fetch = axios.create({
      baseURL: baseEndpoint,
      timeout: 1000,
      headers: {'Authorization': 'Bearer '+ jwt}
    });


    fetch.post("/api/checkout/saveOrder", session).then((response)=>{
      setResponse(response).catch(error => setError(error.response.data))
    })

    console.log("session :" + session)
    console.log("session length + " + session.length);
    console.log("jwt: " + jwt)
    console.log("Response: " + response);
    console.log("error:  " + error);

  }


    useEffect(() => {
        // console.log(session);
        saveOrder();
        // console.log(response);
        // console.log(error);
        // console.log(jwt)
    }, [jwt])

    useEffect(() => {
        const delay = setTimeout(() => {
            setTimer(prev => prev - 1)
        }, 1000)    

    },[timer])



    const timeout = setTimeout(() => {
        navigate('/orders', {replace: true})
    }, 5000);

    return(
        <div className="mx-auto min-h-screen pt-32">
            <h1 className="text-center center text-6xl">Order Succesfully placed</h1>

            <p className="text-center bg-center">Redirecting to orders in: {timer}</p>
            <div>{error}</div>
        </div>
    )
}