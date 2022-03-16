import React, { useEffect, useState } from 'react'
import NavBar from '../components/navbar/navbar.jsx'
import productImg from "../images/product_placeholder.png"
import { FeatureSlider } from '../components/FeatureSilder/FeatureSlider.jsx'
import "./products.css";
import cod from '../images/cod.png';
import delivery from "../images/delivery.png"
import returnIcon from "../images/return.png"
import warranty from "../images/warranty.png"
import { useParams } from 'react-router-dom';
import { readProducts } from '../homePage.jsx';
import dompurify from 'dompurify'
import { getDatabase, ref, set, get, child } from "firebase/database";

export const ProductsPage = (props) => {
  const sanitizer = dompurify.sanitize;
  const [params, setParams] = useState({})
  const [feature, setFeatures] = useState([])
  const [quantity, setQuantity] = useState(1)
  
  console.log(params)
  let { id } = useParams();
  
  useEffect(() => {
    (async function () {
       let params = await readProducts(id);
      setParams(params);
      console.log("quantity is",params)
    })()

    let randomProducts = [...Array(9)].map(() =>
      Math.floor(Math.random() * 1000)
    )
    Promise.all(
      randomProducts.map((e) => {
        return readProducts(e);
      })
    ).then(data => {
      let temp = []
      for (let i = 0; i < data.length; i++) {
        temp.push({ productId: randomProducts[i], ...data[i] });
      }
      
      setFeatures(temp)
    })
  }, [id])
  
  async function cartAdder(id) {
    let userId = sessionStorage.getItem("userId")
    console.log(userId)
    try {
      const dbRef = ref(getDatabase())
      let userData = await (await get(child(dbRef, `users/${userId}`))).val()
      console.log(userData)
      let updatedData = {}
        if (!userData.cart) {
          let cart = [];
          cart.push({id:id,quantity:quantity});
          updatedData = { ...userData, cart: cart };
        } else if (userData.cart.some((e) => e.id === id)) {
          let cart = userData.cart.map(e => {
            if (e.id === id) {
              return {...e,quantity:quantity}
            }
            return { ...e }
          })
          updatedData = { ...userData, cart: cart };
          // updatedData = {...userData,cart:[]}
          console.log("item is in cart")
        } else {
          console.log("add-item")
          let cart = [...userData.cart,{id:id,quantity:1}];
          updatedData = { ...userData, cart: cart };
        }
        const db = getDatabase();
        set(ref(db, "users/" + userId), { ...updatedData });
        console.log(updatedData);
    } catch (error) {
      console.log(error);
    }
  }

  function quantInc() {
    setQuantity(preQuant => {
      return preQuant +1 
    })
  }

  function quantDec() {
     setQuantity((preQuant) => {
       return preQuant - 1;
     });
  }
    return (
      <main className="products-main">
        <NavBar sessionState={props.sessionState} />
        <section className="products-content">
          <div className="productsWrapper">
            <img
              src={
                params.images?.large?.url ? params.images.large.url : productImg
              }
              className="product-img"
              alt=""
            />
            <div className="product-desc">
              <div className="product-title">{params.title}</div>
              <div>
                <div className="price">
                  <sup>₹</sup>
                  {params.price}
                </div>
                <small>Inclusive of all taxes</small>
              </div>
              <div>
                <ul className="feature-list">
                  {typeof params?.feature === "string"
                    ? null
                    : params?.feature?.map((e) => {
                        return <li>{e}</li>;
                      })}
                </ul>
              </div>
              <section className="assurance">
                <div className="feat-img-wrap">
                  <img className="perk-img" src={cod} alt="" />
                  <small className="amazon-perks">Pay on Delivery</small>
                </div>
                <div className="feat-img-wrap">
                  <img className="perk-img" src={delivery} alt="" />
                  <small className="amazon-perks">30 day returns</small>
                </div>
                <div className="feat-img-wrap">
                  <img className="perk-img" src={returnIcon} alt="" />
                  <small className="amazon-perks">Amazon Delivered</small>
                </div>
                <div className="feat-img-wrap">
                  <img className="perk-img" src={warranty} alt="" />
                  <small className="amazon-perks">Warranty Policy</small>
                </div>
              </section>
            </div>
            <div className="buy-block">
              <section>
                <div className="price">
                  <sup>₹</sup>
                  {params.price}
                </div>
                <small className="stock">In Stock</small>
                <div>Free Delivery</div>
                <div className="quantity">
                  <button className="quant-but" onClick={quantInc}>
                    +
                  </button>
                  <div>{quantity}</div>
                  {quantity === 1 ? (
                    <div></div>
                  ) : (
                    <button className="quant-but" onClick={quantDec}>
                      -
                    </button>
                  )}
                </div>
                <div className="button-div">
                  <button
                    onClick={() => cartAdder(id)}
                    className="products-button"
                  >
                    Add to Cart
                  </button>
                  <button className="products-button buy-now">Buy Now</button>
                </div>
              </section>
            </div>
          </div>
          <div>
            <td
              dangerouslySetInnerHTML={{
                __html: sanitizer(params?.description),
              }}
            />
          </div>
          <div>
            <div>More in Category</div>
            <div>
              <FeatureSlider data={feature} />
            </div>
          </div>
        </section>

        <footer className="footer">
          <small>@2022 Amazon All Rights Reserved</small>
        </footer>
      </main>
    );
}
