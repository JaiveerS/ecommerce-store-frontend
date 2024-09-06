import React, { useContext, useEffect,useRef } from "react";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate} from "react-router-dom";


export default function Search(){
    const {endpoint} = useContext(ShopContext);
    const [search, setSearch] = useState("");
    const [response, setResponse] = useState();
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);




    function onChange(event){
        setSearch(event.target.value);
    }


    function getProducts(){
        if(search.length === 0){
            setShowDropdown(false);
            return;
        }

        const fetch = axios.create({
            baseURL: endpoint,
        })

        fetch.get("/get", {params: {search}}).then(response => {
            setResponse(response)
            setShowDropdown(true);
        })

    }

    function handleSuggestionClick(index){
        setSearch("")
        if (inputRef.current) {
            inputRef.current.value = '';
        }

        navigate('/product/' + index[1])
    }


    //get list from api 
    useEffect(() => {
        // console.log(search);
        if(response === undefined){
            console.log("undefined recorded")
        }
        getProducts();
        // console.log(response)
    }, [search])




    return(
        <div className="my-auto pl-5 hidden lg:block">
            <input 
            className="border-2 border-gray-300 bg-white h-9 px-5 rounded-lg text-sm focus:outline-none" 
            onChange={onChange} 
            type="search"
            placeholder="Search"
            ref={inputRef}
            >
            </input>

            {/* {response.data.map(index => {
                console.log(index[0])
            })} */}

            {showDropdown && (
                <ul className="absolute z-10 px-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {response.data.length > 0 ? (
                        response.data.map(index => (
                            <li
                                key={index[1]}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSuggestionClick(index)}
                            >
                                {index[0]}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-500">No results found</li>
                    )}
                </ul>
            )}
            
            {/* {response !== undefined ? console.log(response.data) : "empty"} */}
        </div>
    )
}