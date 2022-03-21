import React ,{useEffect, useState} from 'react'
import checkout2 from '../images/checkout2.gif'
import amazonBadge from '../images/amazonBadge.png'
import primeBanner from '../images/primeBanner.jpg'
import CheckoutItem from '../components/CheckoutItem/CheckoutItem.jsx'
import './checkOut2.css'
import { getCheckout } from '../api/getCheckout'
import { getProducts } from '../api/getProduct'
import setOrder from '../api/setOrder'
import { Navigate, useNavigate } from "react-router-dom";


const CheckOut2 = () => {

  const [checkout, setCheckout] = useState({})
  const [products, setProducts] = useState([])
  const history = useNavigate()
  
  useEffect(() => {
    (async function () {
      let checkout = await getCheckout()
      console.log("checkout",checkout)
      setCheckout(checkout);
      
      await Promise.all(
        checkout?.items?.map((e) => {
          return getProducts(e.id);
        })
      ).then((data) => {
        console.log(data)
        let indexedData = data?.map((e, index) => {
          return { productId: checkout.items[index].id, ...e };
        });
        setProducts(indexedData);
      });
    })()

  }, [])
  

  const placeOrder = () => {
    (async function() {
      await setOrder(checkout);
      history("/orders");
    })()

  }

  // refactor

  const findTotalPrice = () => {
    let totalPrice = checkout.items?.reduce((total, currentval, index) => {
      let price = products[index]?.price ? products[index].price : 2999;
      return total + currentval?.quantity * price;
    }, 0);

    return totalPrice;
  };
  console.log(checkout)
  return (
    <main className="checkout-2-wrapper">
      <div className="checkout-2-wrapper-1">
        <section className="checkout-2-container">
          <img className="payment-image" src={checkout2} alt="" />
          <img src={amazonBadge} alt="" />
          <div>
            <div>
              <div className="checkout-2-header">Review your order</div>
              <br />
              <small>
                By placing your order, you agree to Amazon's privacy notice and
                conditions of use.
              </small>
            </div>
            <br />
          </div>
          <div className="checkout-2-content">
            <section className="checkout-wrapper">
              <img src={primeBanner} alt="" />
              {products?.map((product, index) => {
                return (
                  <CheckoutItem
                    product={product}
                    productMeta={checkout?.items[index]}
                  />
                );
              })}
            </section>
            <section className="place-order-div">
              <button onClick={placeOrder} className="place-order-button">Place your Order</button>
              <div className="price-list">
                Order Summary
                <section className = "summary-params">
                  <div>Items:</div>
                  <div>
                    <sup>₹</sup>
                    {findTotalPrice()}
                  </div>
                </section>
                <section className="summary-params">
                  <div>Delivery:</div>
                  <div>
                    {/* <sup>₹</sup>
                    free */}
                    Free
                  </div>
                </section>
                <section className="summary-params">
                  <div>Discount:(Flat 5%)</div>
                  <div>
                    <sup>₹</sup>
                    {Math.floor(findTotalPrice() * (5 / 100))}
                  </div>
                </section>
              </div>
              <div className="summary-params order-total">
                <div>Order Total:</div>
                <div>
                  <sup>₹</sup>
                  {findTotalPrice()-Math.floor(findTotalPrice() * (5 / 100)) + 1000}
                </div>
              </div>
            </section>
          </div>
          <section>
            <div>
              <div>
                <small>
                  Need help? Check our help pages or contact us 24x7
                </small>
              </div>
              <br />
              <div>
                <small>
                  When your order is placed, we'll send you an e-mail message
                  acknowledging receipt of your order. If you choose to pay
                  using an electronic payment method (credit card, debit card or
                  net banking), you will be directed to your bank's website to
                  complete your payment. Your contract to purchase an item will
                  not be complete until we receive your electronic payment and
                  dispatch your item. If you choose to pay using Pay on Delivery
                  (POD), you can pay using cash/card/net banking when you
                  receive your item.
                </small>
              </div>
            </div>
            <br />
            <small>
              Conditions of Use | Privacy Notice © 2012-2022, Amazon.com, Inc.
              and its affiliates
            </small>
          </section>
        </section>
      </div>
    </main>
  );
}

export default CheckOut2;