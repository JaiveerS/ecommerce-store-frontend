import { useContext, useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext"
import axios from "axios";
import Product from "../pages/home/Product";


export default function Recommendations({id}){
    const [product, setProduct] = useState();
    const {endpoint} = useContext(ShopContext);
    const location = useLocation();

    //send id of item
    function getRecommendations (){
        axios.get(endpoint+ "/recommended", {params: {id: id}}).then((response)=> {
            setProduct(response.data)
        })
    }

    useEffect(() =>{
        getRecommendations();
    },[location.key])


    return (
        <div className="">
            {/* <div className="h-20 min-w-min max-w-screen-xl mx-auto px-2 py-6 "> */}
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-4 sm:px-4 sm:py-5 lg:max-w-7xl lg:px-10">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        
                        {product !== undefined ? product.map((product) => (
                            <div key={product.id} className="group relative bg-gray-100 p-2 rounded">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                    alt="alt"
                                    src={product.image}
                                    className="h-64 w-full object-contain lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link to={"/product/"+ product.id}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.productName}
                                            </Link>
                                        </h3>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">${product.price}.00</p>
                                </div>
                            </div>
                        )): ""}
                    </div> 
                </div>
                </div>
            {/* </div> */}
        </div>
    )
}