import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../../components/FormInput";


export default function Register() {
    const [values, setValues] = useState(
        {
            firstname: "",
            lastname: "", 
            email: "", 
            password: "",
            confirmPassword: "", 
        })

    const input = 
    [
        {
            id:1,
            name: "firstname",
            type: "text",
            placeholder: "Firstname",
            title: "Firstname must be atleast 3-12 characters long and shouldn't include special characters",
            label: "Firstname",
            pattern: "^[A-Za-z0-9]{3,12}$",
            required: true
        },
        {
            id:2,
            name: "lastname",
            type: "text",
            placeholder: "Lastname",
            title: "Lastname must be atleast 3 characters long",
            label: "Lastname",
            pattern: "^[A-Za-z0-9]{3,12}$",
            required: true
        },
        {
            id:3,
            name: "email",
            type: "text",
            placeholder: "Email",
            title: "Email must be a valid email address",
            label: "Email",
            pattern: "^[^@]+@[^@]+.[^@]+$",
            required: true
        },
        {
            id:4,
            name: "password",
            type: "password",
            placeholder: "Password",
            title: "Must be atleast 6 characters long",
            label: "Password",
            pattern: ".{6,}",
            required: true
        },
        {
            id:5,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            title: "Passwords don't match",
            label: "Confirm Password",
            pattern: values.password,
            required: true
        },
    ]

    const {authEndpoint, jwt, setJwt} = useContext(ShopContext);
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");


    const body = {firstname: values.firstname, lastname: values.lastname, email: values.email , password: values.password};
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault();

        console.log("your trying to register");
        console.log("email: " + values.email);
        console.log("password: " + values.password);
        console.log(authEndpoint);
        axios.post(authEndpoint + "/register", body)
        .then(response => setResponse(response)).catch(error => setError(error.response.data.message));
    }

    const handleChange = (e) => 
    {
        setValues({...values, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        response.status === 201 ? setJwt(response.data.token): setJwt("");
        if(jwt !== ""){
            setError("");
            navigate('/', {replace: true});

        }
    },[jwt, response.data , response.status]);

    return (
        <section>
        <div className="flex flex-col items-center my-10 px-6 py-2 mx-auto md:h-screen lg:py-0">
            <div className="w-full  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Register your account
                    </h1>
                    {console.log(response)}
                    {console.log(error)}
                    <p className="text-red-600 font-bold">{error}</p>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        {input.map((input) => (
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={handleChange}/>
                        ))}
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-l-black bg-black hover:bg-slate-600 hover:text-gray-100">Sign up</button>
                        <p className="text-sm font-light text-gray-700 hover:underline">
                            Already have an account? <Link to={"/login"} className="font-medium tex2 ">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
    )
}