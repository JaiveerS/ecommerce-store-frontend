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
        // Decrement timer every second
        const intervalId = setInterval(() => {
          setTimer(prev => (prev > 0 ? prev - 1 : 0)); // Ensure timer doesn't go below 0
        }, 1000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
      }, []); // Empty dependency array to run only once on mount
    
      useEffect(() => {
        // Navigate to '/orders' after 5 seconds
        const timeoutId = setTimeout(() => {
          navigate('/orders', { replace: true });
        }, 5000);
    
        // Cleanup timeout on component unmount
        return () => clearTimeout(timeoutId);
      }, [navigate]); 

    return(
        <div className="mx-auto min-h-screen pt-32">
            <h1 className="text-center center text-6xl">Order Succesfully placed</h1>

            <p className="text-center bg-center">Redirecting to orders in: {timer}</p>
            <div>{error}</div>
        </div>
    )
}