import React from "react";
import {
  // BrowserRouter as Router,
  // Switch,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import NotFound from "./pages/NotFound";
import DetailPage from "./pages/DetailPage";
import OrderPage from "./pages/OrderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
