import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./homePage";
import { LoginScreen } from "./components/loginScreen/loginScreen";
import { AccountCreater } from "./components/createAccount/accountCreater";
import { ProductsPage } from "./pages/products";
import { CartPage } from "./pages/cart";
import { Orders } from "./pages/orders";

  // const seeder = () => {
  //   const db = getDatabase();
  //   prodData.forEach((e,index) => set(ref(db, "products/" + index), { ...e }));
  // };
  // seeder();

function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    name: "",
  });
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage name={session.name} sessionState={session.isLoggedIn} />}
      />
      <Route path="/login" element={<LoginScreen setSession={setSession} />} />
      <Route path="/signup" element={<AccountCreater setter={setSession} />} />
      <Route path="/products/:id" element={<ProductsPage sessionState={session.isLoggedIn}/>} />
      <Route path="/cart" element={<CartPage sessionState={session.isLoggedIn} />} />
      <Route path="/orders" element={<Orders/>} />
    </Routes>
  );
}

export default App;
