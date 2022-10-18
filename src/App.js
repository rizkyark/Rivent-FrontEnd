import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// import PrivateRoute from "./helpers/route/PrivateRoute";
// import PublicRoute from "./helpers/route/PublicRoute";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import NotFound from "./pages/NotFound";
import DetailPage from "./pages/DetailPage";
import OrderPage from "./pages/OrderPage";
import UpdateProfile from "./pages/UpdateProfile";
import ManageEvent from "./pages/ManageEvent";
import PaymentPage from "./pages/PaymentPage";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<NotFound />} />

        {/* <Route element={<PublicRoute restricted={true} />}> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* </Route> */}

        {/* <Route element={<PrivateRoute isAdmin={true} />}> */}
        <Route path="/manage-event" element={<ManageEvent />} />
        {/* </Route> */}

        {/* <Route element={<PrivateRoute isAdmin={false} />}> */}
        <Route path="/order" element={<OrderPage />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/payment" element={<PaymentPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
