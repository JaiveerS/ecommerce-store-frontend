import React from "react";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import ShopContextProvider from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import APIService from "./APIService";


function App() {
  return (
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/cart" element={<Cart />}/>
            <Route exact path="/axios" element={<APIService />}/>          
          </Routes>
        </Router>
      </ShopContextProvider>
  );
}

export default App;
