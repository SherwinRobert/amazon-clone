import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./homePage";
import { LoginScreen } from "./components/loginScreen/loginScreen";
import { AccountCreater } from "./components/createAccount/accountCreater";
import { ProductsPage } from "./pages/products";
import { getDatabase, ref, set, get, child } from "firebase/database";
import prodData from "./products.json"
function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    name: "",
  });

  // function writeUserData(userId) {
  //   const db = getDatabase();
  //   set(ref(db, "products/" + userId), {
  //     username: "chaitanya",
  //   }).then((response) => console.log(response));
  // }

  // const seeder = () => {
  //   const db = getDatabase();
  //   prodData.forEach((e,index) => set(ref(db, "products/" + index), { ...e }));
  // };
  // seeder();
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage sessionState={session.isLoggedIn} />}
      />
      <Route path="/login" element={<LoginScreen setSession={setSession} />} />
      <Route path="/signup" element={<AccountCreater setter={setSession} />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  );
}

export default App;
