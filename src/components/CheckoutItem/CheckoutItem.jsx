import React from 'react'
import productImg from '../../images/product_placeholder.png'
import './CheckoutItem.css'

const CheckoutItem = (props) => {
  console.log(props)
  return (
    <div className="checkout-item-wrapper">
      <img className='checkout-item-img' src={props?.product?.images?.large?.url || productImg} alt="" />
      <div className="">
        <div>{props?.product?.title}</div>
        <div>
          <sup>₹</sup>
          {props?.product?.price ? props?.product?.price : 2999}
        </div>
        <div>{`Quantity: ${props?.productMeta?.quantity}`}</div>
      </div>
    </div>
  );
}

export default CheckoutItem