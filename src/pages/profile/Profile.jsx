import { useContext, useEffect } from "react"
import { ShopContext } from "../../context/ShopContext"
import { useNavigate } from "react-router-dom";



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
            <img className="object-contain h-40 w-40" src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt=""></img>
            <p>Name: {firstname} {lastname}</p>
            <p>Email: {email}</p>
        </div>
    )
}