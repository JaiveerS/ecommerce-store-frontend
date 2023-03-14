import React from "react";

export default function Product(props){

    const {id,product_name,price,category,description,productImage} = props.data

    return(
        <div className="bg-white w-80">
            <img className=" h-80 w-72 object-cover" alt={id} src={productImage}/>
            <h1 className="text-center py-2">{product_name}</h1>
            <h3 className="text-center">Price: ${price}</h3>
            {/* <h4 className="text-center py-2">Category: {category}</h4> */}
            {/* <p  className="text-center">{description}</p> */}
            <div className=" flex justify-center py-4">
                <button className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none">Add To Cart</button>
            </div>
        </div>
    )
}