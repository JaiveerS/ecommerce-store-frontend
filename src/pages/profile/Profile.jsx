import { useContext } from "react"
import { ShopContext } from "../../context/ShopContext"


export default function Profile(){
    const {firstname, lastname, email} = useContext(ShopContext)


    return(
        <div className="flex flex-col items-center pt-10 min-h-screen">
            <h1 className="font-semibold text-xl pb-5">Profile</h1>
            <p>Name: {firstname} {lastname}</p>
            <p>Email: {email}</p>
        </div>
    )
}