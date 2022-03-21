import React, { useState } from "react";
import amazonIcon from "../images/amazon_logo1.png"
import checkout1 from "../images/checkout1.gif"
import { NavBarWrapper } from "../hoc/navBarWrapper";
import { useNavigate } from "react-router-dom";
import './checkOut.css'
import setCheckout from "../api/setCheckout";

const CheckOut = () => {
  const [payment, setPayment] = useState({
    paymentType: "",
    ccvCode: ""
  })

  const history = useNavigate()

  console.log(payment)

  const paymentHandler = (e) => {
    const value = e.target.value
    console.log(value)
    const inputName = e.target.name
    setPayment(preState => {
      return {
        ...preState,
        [inputName] : value
      }
    })
  }
  
  const paymentSubmitter = (e) => {
    e.preventDefault()
    if (payment.paymentType === "credit" && payment.ccvCode.length > 3) {
      history("/checkout2")
      setCheckout("/paymentType",payment.paymentType)
    } else if (payment.paymentType === "cod" || payment.paymentType === "upi") {
      history("/checkout2")
      setCheckout("/paymentType", payment.paymentType);
    } else {
      console.log("click some shit")
    }
  }

  return (
    <main className="payment-top-wrapper">
      <div className="payment-top-wrapper-1">
        <div className="payment-header">
          <img className="payment-image" src={checkout1} alt="" />
          <div className="checkout-title">Select a payment Method</div>
        </div>

        <form onSubmit={paymentSubmitter} className="payment-wrapper">
          <div>
            <section className="form-opt-wrapper">
              <input
                onChange={paymentHandler}
                type="radio"
                id="credit"
                name="paymentType"
                checked={payment.paymentType === "credit"}
                value="credit"
              />
              <label htmlFor="credit">
                <div>Pay using Credit or Debit Card</div>
                {payment.paymentType === "credit" && (
                  <div>
                    <div>Enter CCV</div>
                    <input
                      onChange={paymentHandler}
                      type="password"
                      maxlength="4"
                      className="ccv-tag"
                      name="ccvCode"
                    />
                  </div>
                )}
              </label>
            </section>
            <section className="form-opt-wrapper">
              <input
                onChange={paymentHandler}
                type="radio"
                id="upi"
                name="paymentType"
                checked={payment.paymentType === "upi"}
                value="upi"
              />
              <label htmlFor="upi">
                <div>Net Banking Net Banking</div>
                <div>For faster payment and instant refund, please use UPI</div>
              </label>
            </section>
            <section className="form-opt-wrapper">
              <input
                onChange={paymentHandler}
                type="radio"
                id="cod"
                name="paymentType"
                checked={payment.paymentType === "cod"}
                value="cod"
              />
              <label htmlFor="cod">
                <div>Pay on Delivery</div>
                <div>
                  Pay digitally with SMS Pay Link. Cash may not be accepted in
                  COVID restricted areas.Know more.
                </div>
              </label>
            </section>
          </div>
          <div className="form-opt-wrapper checkout-confirm">
            <div>
              <button className="checkout-button">Continue</button>
            </div>
            <div>You can review this order before it's final.</div>
          </div>
        </form>
      </div>
      <div className="checkout-footer">
        <small>Need help? Check our help pages or contact us 24x7</small>
        <small>
          Conditions of Use | Privacy Notice © 2012-2022, Amazon.com, Inc. and
          its affiliates
        </small>
      </div>
    </main>
  );
}

export default CheckOut;