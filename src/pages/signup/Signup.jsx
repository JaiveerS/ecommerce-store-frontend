import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import {Link} from 'react-router-dom';


export default function Signup() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {authEndpoint, jwt, setJwt} = useContext(ShopContext);
    const [response, setResponse] = useState("");
    // const [loginStatus, setLoginStatus] = useState("Not Logged In");
    const [error, setError] = useState("");
    const [check, setCheck] = useState("");


    const body = {firstname:firstname, lastname: lastname, email: email , password: password};
    const navigate = useNavigate();

    function handleLogin(event){
        event.preventDefault();
        console.log("your trying to log in");
        console.log("email: " + email);
        console.log("password: " + password);
        console.log(authEndpoint);

        axios.post(authEndpoint + "/register", body)
        .then(response => setResponse(response)).catch(error => setError("Cannot Register Account"));
    }

    useEffect(() => {
        response.status === 200 ? setJwt(response.data.token): setJwt("");
        console.log(jwt);
        if(jwt !== ""){
            // setLoginStatus("Logged In");
            setError("");
            navigate('/', {replace: true});

        }
    },[jwt, navigate, response.data , response.status, setJwt]);

    function handleChangeFirstname(event){
        setFirstname(event.target.value);
    }

    function handleChangeLastname(event){
        setLastname(event.target.value);
    }

    function handleChangeEmail(event){
        setEmail(event.target.value);
    }
    function handleChangePassword(event){
        setPassword(event.target.value);
    }
    function handleChangeConfirmPassword(event){
        if(event.target.value !== password){
            setCheck("Passwords Dont Match");
        }else{
            setCheck("");
        }
    }

    return (
        <section>
        <div className="flex flex-col items-center my-10 px-6 py-2 mx-auto md:h-screen lg:py-0">
            <div className="w-full  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Register your account
                    </h1>
                    {error}
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input onChange={handleChangeEmail} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                            <input onChange={handleChangeFirstname} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="firstname" required=""/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                            <input onChange={handleChangeLastname} type="name" name="ename" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="lastname" required=""/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input onChange={handleChangePassword} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""/>
                        </div>
                        <div>
                            {check}
                            <label className="block mb-2 text-sm font-medium text-gray-900}">Confirm Password</label>
                            <input onChange={handleChangeConfirmPassword} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""/>
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
                        </div>
                        <button type="submit" onClick={(e)=> handleLogin(e)} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-l-black bg-black hover:bg-slate-600 hover:text-gray-100">Sign up</button>
                        {/* {loginStatus} */}
                    </form>
                </div>
            </div>
        </div>
        </section>
    )
}