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
import { getProducts } from '../api/getProduct.js';
import dompurify from 'dompurify'
import { getDatabase, ref, set, get, child } from "firebase/database";
import { NavBarWrapper } from '../hoc/navBarWrapper.js';
import ReactImageMagnify from 'react-image-magnify';

export const ProductsPage = (props) => {
  const sanitizer = dompurify.sanitize;
  const [params, setParams] = useState({})
  const [feature, setFeatures] = useState([])
  const [quantity, setQuantity] = useState(1)
  
  console.log(params)
  let { id } = useParams();
  
  useEffect(() => {
    (async function () {
       let params = await getProducts(id);
      setParams(params);
      console.log("quantity is",params)
    })()
    
    let randomProducts = [...Array(9)].map(() =>
      Math.floor(Math.random() * 1000)
    )
    Promise.all(
      randomProducts.map((e) => {
        return getProducts(e);
      })
    ).then(data => {
      let temp = []
      data.forEach((e, i) => {
        temp.push({ productId: randomProducts[i], ...data[i] });
      })
      setFeatures(temp)
    })
  }, [id])
  
  async function cartAdder(id) {
    let userId = sessionStorage.getItem("userId")
    console.log(userId)
    try {
      const dbRef = ref(getDatabase())
      let userData = await (await get(child(dbRef, `users/${userId}`))).val()
      let updatedData = {}

        if (!userData.cart) {
          let cart = [];
          cart.push({id:id,quantity:quantity});
          updatedData = { ...userData, cart: cart };
        }
        else if (userData.cart.some((e) => e.id === id)) {
          let cart = userData.cart.map(e => {
            if (e.id === id) {
              return {...e,quantity:quantity}
            }
            return { ...e }
          })
          updatedData = { ...userData, cart: cart };
          console.log("item is in cart")
        }
        else {
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
        <NavBarWrapper sessionState={props.sessionState}>
          <section className="products-content">
            <div className="productsWrapper">
              {/* <img
                src={
                  params.images?.large?.url
                    ? params.images.large.url
                    : productImg
                }
                className="product-img"
                alt=""
              /> */}
              <ReactImageMagnify
                className="product-img"
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: params.images?.large?.url
                      ? params.images.large.url
                      : productImg,
                  },
                  largeImage: {
                    src: params.images?.large?.url
                      ? params.images.large.url
                      : productImg,
                    width: 2000,
                    height: 2000,
                  },
                }}
              />
              <div className="product-desc">
                <h2 className="product-title">{params.title}</h2>
                <div>
                  <div className="price">
                    <sup>₹</sup>
                    {params.price ? params.price : 2999}
                  </div>
                  <small>Inclusive of all taxes</small>
                </div>
                <div>
                  {params.feature ? (<ul className="feature-list">
                    {typeof params?.feature === "string"
                      ? null
                      : params?.feature?.map((e) => {
                          return <li>{e}</li>;
                        })}
                  </ul>) : <ul>
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, exercitationem.</li>
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, nihil.</li>
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, quia</li>
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, corporis.</li>
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, repudiandae</li>
                      <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum voluptatum quaerat expedita odit architecto voluptates nisi doloribus praesentium recusandae amet!</li>
                      <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint ullam, quo error soluta iusto aspernatur!</li>
                  </ul>}
                 
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
                    {params.price ? params.price : 2999}
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
            <div className="product-description">
              <h2>More about the Product</h2>
              <td
                dangerouslySetInnerHTML={{
                  __html: sanitizer(params?.description),
                }}
              />
            </div>
            <div>
              <h2>Product Recommendations</h2>
              <div>
                <FeatureSlider data={feature} />
              </div>
            </div>
          </section>

          <footer className="footer">
            <small>@2022 Amazon All Rights Reserved</small>
          </footer>
        </NavBarWrapper>
      </main>
    );
}
