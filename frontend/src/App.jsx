import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Browse from "./pages/Browse";
import Sell from "./pages/Sell";
import ProductDetails from "./pages/ProductDetails";
import MyCampus from "./pages/MyCampus";
function App() {
  return ( 
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse" element={<Browse />} />
        <Route
  path="/my-campus"
  element={<MyCampus />}
/>
        <Route
            path="/product/:id"
            element={<ProductDetails />}
            />
          <Route
  path="/sell"
  element={<Sell />}
/>
    
     </Routes>
    </>
  );
}

export default App;