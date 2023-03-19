// import axios from 'axios';
// import { useContext, useEffect} from 'react';
// import { ShopContext } from './context/ShopContext';
// import Product from './pages/home/Product';


// export default function APIService(){

//     const endpoint = "http://localhost:8080/api/products";

//     const {product, setProduct} = useContext(ShopContext)    

//     function getProducts (){
//         axios.get(endpoint).then((response)=> {
//             console.log(response.data._embedded.productList)
//             setProduct(response.data._embedded.productList)
//         })
//     }

//     return (
//         <div>
//             <div className="flex space-between flex-wrap justify-center p-10">
//                 {product.map((data => (
//                     <Product key={data.id} data={data}/>
//                 )))}
//                 <button onClick={getProducts}>test</button>
//             </div>
//         </div>
//     )
// }
