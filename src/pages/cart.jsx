import React, { useEffect ,useState } from 'react'
import { CartItem } from '../components/CartItem/CartItem.jsx'
import NavBar from '../components/navbar/navbar.jsx';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { readProducts } from '../homePage.jsx';

export const CartPage = (props) => {
  const [cart, setCartState] = useState([])
  const [userId] = useState(() => sessionStorage.getItem("userId"));
  console.log("cart-item",cart)
 
  useEffect(() => {
    (async function () {
      let userId = sessionStorage.getItem("userId");
      const dbRef = ref(getDatabase());
      let userData = await (await get(child(dbRef, `users/${userId}`))).val();

      await Promise.all(
         userData.cart.map((e) => {
           return readProducts(e.id);
         })
      ).then(data => {
        let indexedData = data.map((e, index) => {
          return {...e,productId:userData.cart[index]}
        })
        console.log(indexedData)
        setCartState(indexedData)
      })
    })();
    
  },[])
  return (
    <div>
      <NavBar sessionState={props.sessionState} />
      <section>
        <div>Shopping Cart</div>
        <div>
          {cart?.map((product) => {
            return (
              <CartItem setCartState={setCartState} cart={cart} data={product} userId={userId} />
            );
          })}
        </div>
      </section>
    </div>
  );
}
