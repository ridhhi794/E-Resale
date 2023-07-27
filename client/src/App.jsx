import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components";
import {
  AddProduct,
  CheckProducts,
  Contact,
  AddDetails,
  Login,
  Signup,
} from "./pages";
import { Navbar } from "./components";
const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-slate-400 min-h-screen flex flex-row">
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/AddProduct"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CheckProducts"
            element={
              <ProtectedRoute>
                <CheckProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddDetails"
            element={
              <ProtectedRoute>
                <AddDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
