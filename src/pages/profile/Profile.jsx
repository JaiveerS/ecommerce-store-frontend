import { useContext, useEffect } from "react"
import { ShopContext } from "../../context/ShopContext"
import { useNavigate } from "react-router-dom";
import profile from "../../assets/profile.jpg"



export default function Profile(){
    const {firstname, lastname, email, jwt} = useContext(ShopContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (jwt === null || jwt === ""){
            navigate('/', {replace: true})
        }
    })


    return(
        <div className="flex flex-col items-center pt-10 min-h-screen">
            <h1 className="font-semibold text-xl pb-5">Profile</h1>
            <img className="object-contain h-40 w-40" src={profile} alt=""></img>
            <p>Name: {firstname} {lastname}</p>
            <p>Email: {email}</p>
        </div>
    )
}