import "./App.css";
import { Routes, Route } from "react-router-dom";
import MyListings from "./pages/MyListings";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompleteProfile from "./pages/CompleteProfile";
import Browse from "./pages/Browse";
import Sell from "./pages/Sell";
import ProductDetails from "./pages/ProductDetails";
import MyCampus from "./pages/MyCampus";

function App() {
  return (
    <>
      <Navbar />
      <MobileNavbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route
  path="/my-listings"
  element={
    <ProtectedRoute>
      <MyListings />
    </ProtectedRoute>
  }
/>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/browse" element={<Browse />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/sell"
          element={
            <ProtectedRoute>
              <Sell />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-campus"
          element={
            <ProtectedRoute>
              <MyCampus />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;