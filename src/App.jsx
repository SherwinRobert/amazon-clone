import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./homePage";
import { LoginScreen } from "./components/loginScreen/loginScreen";
import { AccountCreater } from "./components/createAccount/accountCreater";
import { ProductsPage } from "./pages/products";
import { CartPage } from "./pages/cart";
import { Orders } from "./pages/orders";
import CheckOut from "./pages/checkOut.jsx";
import CheckOut2 from "./pages/checkOut2";
import { useAuth } from "./hooks/useAuth";
import { app } from "./firebase-config";
import ProtectedRouter from "./hoc/ProtectedRouter";

function App() {
  const { user } = useAuth();

  console.log("state",user)
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage name={user?.email} sessionState={user.isLoggedIn} />}
      />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<AccountCreater />} />
      <Route
        path="/products/:id"
        element={<ProductsPage sessionState={user.isLoggedIn} />}
      />
      <Route
        path="/cart"
        element={ProtectedRouter(CartPage, user.isLoggedIn)}
      />
      <Route
        path="/checkout"
        element={ProtectedRouter(CheckOut, user.isLoggedIn)}
      />
      <Route
        path="/checkout2"
        // element={ProtectedRouter(CheckOut2, user.isLoggedIn)}
        element={ProtectedRouter(CheckOut2, user.isLoggedIn)}
      />
      <Route
        path="/orders"
        element={ProtectedRouter(Orders, user.isLoggedIn)}
      />
    </Routes>
  );
}

export default App;
