import React from 'react'
import { Link } from 'react-router-dom';
import productImg from '../../images/product_placeholder.png'
import "./CartItem.css"
import { getDatabase, ref, set, get, child } from "firebase/database";
import { Delete } from '../../icons/Delete';

export const CartItem = (props) => {
  async function cartDeleter(id) {
    try {
      let userId = sessionStorage.getItem("userId");
      let updatedData = props?.cart?.filter((item) => item.productId !== id);
      let updatedCart = props?.cartMeta.filter((item) => item.id !== id)
        const db = getDatabase();
        set(ref(db, "users/" + userId + "/cart"), [...updatedCart]);
        console.log(updatedData);
     
      console.log(updatedData)
      props.setCartState(updatedData)
      props.setCartMeta(updatedCart)
    } catch (error) {
      console.log(error);
    }
  }
  
  function quantInc(id) {
   props.setCartMeta((preVal) => {
     let updatedQuant = preVal.map((e) => {
       if (e.id === id) {
         let temp = e.quantity + 1;
          console.log("quantity", temp);
         return { ...e, quantity:temp };
       }
       return { ...e };
     });
     const db = getDatabase();
     set(ref(db, `users/${props.userId}/cart`), [...updatedQuant]);
     return updatedQuant;
   });
  }

  function quantDec(id) {
      props.setCartMeta((preVal) => {
        let updatedQuant = preVal.map((e) => {
          if (e.id === id) {
            let temp = e.quantity > 1 ? e.quantity - 1 : 1
            return { ...e, quantity: temp };
          }
          return { ...e };
        });
        const db = getDatabase();
        set(ref(db, `users/${props.userId}/cart`), [...updatedQuant]);
        return updatedQuant;
      });
  }

  return (
    <div className="cart-item-wrapper">
      <div className="cart-item">
        <Link to={`/products/${props?.data?.productId}`}>
          <img
            className="cart-img"
            src={props?.data?.images?.large?.url}
            alt=""
          />
        </Link>
        <div>
          <div>{props?.data?.title}</div>
          <div className="cart-fun-wrapper">
            <div className="cart-changer">
              <button
                className="cart-button"
                onClick={() => quantInc(props?.data?.productId)}
              >
                +
              </button>
              <div className="quant-disp">{props?.cartItem?.quantity}</div>
              <button
                className="cart-button"
                onClick={() => quantDec(props?.data?.productId)}
              >
                -
              </button>
            </div>
            <Delete onClick={() => cartDeleter(props?.data?.productId)} />
          </div>
        </div>
      </div>
      <div className="cart-price">
        <sup>₹</sup>
        {props?.data?.price * props?.cartItem?.quantity}
      </div>
    </div>
  );
}
