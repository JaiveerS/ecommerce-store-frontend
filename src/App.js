import React from "react";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import ShopContextProvider from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import ProductPage from "./pages/product/ProductPage";
import NotFound from "./pages/404/NotFound";
import Checkout from "./pages/checkout/Checkout";
import OrderPlaced from "./pages/order/OrderPlaced";
import Register from "./pages/register/Register";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/profile/Profile";
import Footer from "./components/Footer";
import Category from "./pages/category/Category";
import OrderSuccess from "./pages/orderSuccess/Success";


function App() {
  return (
      <ShopContextProvider>
        <Router>
        <header className="sticky top-0 z-50 bg-white shadow">
          <Navbar />
        </header>
        
          <ScrollToTop/>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/cart" element={<Cart />}/>
            <Route exact path="/signup" element={<Register />}/>
            <Route exact path="/checkout" element={<Checkout/>}/>
            <Route path="/success" element={<OrderSuccess />}/>
            <Route path="/product/*" element={<ProductPage />}/>
            <Route path="/category/*" element={<Category />}/>
            <Route path="/orders" element={<OrderPlaced/>}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
          <Footer/>
        </Router>
      </ShopContextProvider>
  );
}

export default App;
