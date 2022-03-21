import React, { useEffect ,useState } from 'react'
import { CartItem } from '../components/CartItem/CartItem.jsx'
import NavBar from '../components/navbar/navbar.jsx';
import cartImg from '../images/cartImg.png'
import { getDatabase, ref, set, get, child } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import './cart.css'
import { getProducts } from '../api/getProduct.js';
import { FeatureSlider } from '../components/FeatureSilder/FeatureSlider.jsx';
import useProducts from '../hooks/useProducts.js';
import setCheckout from '../api/setCheckout.js';

export const CartPage = (props) => {
  const [cart, setCartState] = useState([])
  const [cartMeta, setCartMeta] = useState([])
  const [products, random] = useProducts(10);
  const [recom, recomSetter] = useState([])
  const history = useNavigate()
  const [userId] = useState(() => sessionStorage.getItem("userId"));

  useEffect(() => {
    
    (async function () {
      let userId = sessionStorage.getItem("userId");
      const dbRef = ref(getDatabase());
      let cartData = await (await get(child(dbRef, `users/${userId}/cart`))).val();
      setCartMeta(cartData)
      await Promise.all(
         cartData.map((e) => {
           return getProducts(e.id);
         })
      ).then(data => {
        let indexedData = data.map((e, index) => {
          return {productId:cartData[index].id,...e}
        })
        setCartState(indexedData)
      })
    })();
    
  }, [])
  
  useEffect(() => {
     if (products.length > 0) {
       let temp = [];

       if (random.length > 0) {
         products.forEach((e, i) => {
           temp.push({ productId: random[i], ...products[i] });
         });
          recomSetter(temp);
       }
     }
  }, [products, random])
  
  const findTotalPrice = () => {
    let totalPrice = cartMeta?.reduce((total, currentval, index) => {
      let price = cart[index]?.price ? cart[index].price : 2999
      return total + currentval?.quantity * price
    }, 0)
    
    return totalPrice
  }

  const checkout = () => {
    history('/checkout')
    setCheckout({
      items: cartMeta,
      paymentType : "cash"
    })
  }

  return (
    <div className="cart-main-wrapper">
      <NavBar sessionState={props.sessionState} />
      <section className="wrapper">
        <div className="container">
          <section className="cart-items-container">
            <div className="cart-title">
              <div className="cart-header">Shopping Cart</div>
              <div>Price</div>
            </div>
            <div>
              {cart?.map((product, index) => {
                return (
                  <CartItem
                    cartMeta={cartMeta}
                    setCartMeta={setCartMeta}
                    setCartState={setCartState}
                    cart={cart}
                    data={product}
                    userId={userId}
                    cartItem={cartMeta[index]}
                  />
                );
              })}
            </div>
          </section>
          <aside className="checkout-card ">
            <img className="cartImg" src={cartImg} alt="" />
            <div>
              <div>{`Subtotal (${
                cart.length
              } items): ${findTotalPrice()}`}</div>
            </div>
            <button onClick={checkout} className="buy-now-button">
              Products to Buy
            </button>
          </aside>
        </div>
        <div className="cart-header header-border">Based on your Interests</div>
        {recom.length === 10 && <FeatureSlider data={recom} />}
      </section>

      <footer className="footer">
        <small>@2022 Amazon All Rights Reserved</small>
      </footer>
    </div>
  );
}
