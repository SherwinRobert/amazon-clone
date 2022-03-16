import React from 'react'
import { Link } from 'react-router-dom';
import productImg from '../../images/product_placeholder.png'
import "./CartItem.css"
import { getDatabase, ref, set, get, child } from "firebase/database";

export const CartItem = (props) => {
  console.log(props)
  async function cartDeleter(id) {
    try {
        let userId = sessionStorage.getItem("userId");
        const dbRef = ref(getDatabase())
        let userData = await (await get(child(dbRef, `users/${userId}`))).val()
        console.log(userData.cart)
        console.log(id)
        let updatedData = props?.cart?.filter((item) => item.productId !== id);
        const db = getDatabase();
        set(ref(db, "users/" + userId), { ...userData, cart:updatedData });
        console.log(updatedData);
     
      console.log(updatedData)
      props.setCartState(updatedData)
    } catch (error) {
      console.log(error);
    }
  }
  
  function quantInc(id) {
    props.setCartState((preVal) => {
      let updatedQuant = preVal.map(e => {
        if (e.productId.id === id) {
          let temp = {id:id,quantity:e.productId.quantity+1}
          return {...e,productId:temp}
        }
        return {...e}
      })
      const db = getDatabase();
      set(ref(db,`users/${props.userId}/cart`), [...updatedQuant]);
      return updatedQuant
    })
  }

  function quantDec(id) {
      props.setCartState((preVal) => {
        let updatedQuant = preVal.map((e) => {
          if (e.productId.id === id) {
            let temp = { id: id, quantity:e.productId.quantity > 1 ? e.productId.quantity - 1 : 1 };
            return { ...e, productId: temp };
          }
          return { ...e };
        });
        const db = getDatabase();
        set(ref(db, `users/${props.userId}/cart`), [...updatedQuant]);
        return updatedQuant;
      });
  }

  return (
    <div>
      <div className="cart-item">
        {console.log("data", props?.data)}
        <Link to={`/products/${props?.data?.productId?.id}`}>
          <img src={props?.data?.images?.large?.url} alt="" />
        </Link>
        <div>
          <div>{props?.data?.title}</div>
          <button onClick={() => cartDeleter(props?.data?.productId)}>
            Delete
          </button>
          <div>
            <button onClick={()=>quantInc(props?.data?.productId?.id)}>+</button>
            <div>{props?.data?.productId?.quantity}</div>
            <button onClick={()=>quantDec(props?.data?.productId?.id)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}
