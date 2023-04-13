import React, { useContext, useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {authEndpoint, jwt, setJwt} = useContext(ShopContext);
    const [response, setResponse] = useState("");
    // const [loginStatus, setLoginStatus] = useState("Not Logged In");
    const [error, setError] = useState("");


    const body = {email: email , password: password};
    const navigate = useNavigate();

    function handleLogin(event){
        event.preventDefault();
        // console.log("your trying to log in");
        // console.log("email: " + email);
        // console.log("password: " + password);
        console.log(authEndpoint);

        axios.post(authEndpoint + "/login", body)
        .then(response => setResponse(response)).catch(error => setError("Incorrect Credentials Entered"));
    }

    useEffect(() => {
        response.status === 200 ? setJwt(response.data.token): setJwt("");
        console.log(jwt);
        if(jwt !== ""){
            // setLoginStatus("Logged In");
            setError("");
            navigate('/', {replace: true});
        }
    }, [response, jwt, navigate, setJwt]);

    function handleChangeEmail(event){
        setEmail(event.target.value);
    }
    function handleChangePassword(event){
        setPassword(event.target.value);
    }

    return (
        <section>
        <div className="flex flex-col items-center my-10 px-6 py-2 mx-auto md:h-screen lg:py-0">
            <div className="w-full  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Sign in to your account
                    </h1>
                    <p className="text-red-600 font-bold">{error}</p>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input onChange={handleChangeEmail} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input onChange={handleChangePassword} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                {/* <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required=""/>
                                </div> */}
                                {/* <div className="ml-3 text-sm">
                                    <label  className="text-gray-900 ">Remember me</label>
                                </div> */}
                            </div>
                            {/* <a href="#" class="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a> */}
                        </div>
                        <button type="submit" onClick={(e)=> handleLogin(e)} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-l-black bg-black hover:bg-slate-600 hover:text-gray-100">Sign in</button>
                        {/* {loginStatus} */}
                            {/* <a href="#" class="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a> */}
                        <p className="text-sm font-light text-gray-700 hover:underline">
                            Don’t have an account yet? <Link to={"/signup"} className="font-medium tex2 ">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
    )
}