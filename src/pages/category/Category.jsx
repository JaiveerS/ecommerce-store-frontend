import React, { useState, useContext, useEffect} from "react";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import Product from "../home/Product";
import { useLocation } from "react-router-dom";



export default function Category() {
    let location = useLocation();
    let path = location.pathname.split('/')
    const category = path[2];

    const {categoriesEndpoint} = useContext(ShopContext)
    const [product, setProduct] = useState([])

    const thisEndpoint = categoriesEndpoint + "/" + category;

    useEffect(() => {
        axios.get(thisEndpoint).then((response)=> {
            setProduct(response.data)
        })
    }, [location, thisEndpoint])

    return (
        <div>
            <div className="flex flex-col items-center min-h-screen">
            <h1 className="font-bold text-lg pt-4">{category}</h1>
                <div className="flex space-between flex-wrap justify-center p-10 max-w-screen-2xl">
                {product.map((item => (
                        <Product key={item.id} data={item}/>
                    )))}
                </div>
            </div>
        </div>
    )
}