import React from "react";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/cart" element={<Cart />}/>
      </Routes>
    </Router>
  );
}

export default App;
