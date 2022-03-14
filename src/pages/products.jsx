import React from 'react'
import NavBar from '../components/navbar/navbar.jsx'
import productImg from "../images/product_placeholder.png"
import { FeatureSlider } from '../components/FeatureSilder/FeatureSlider.jsx'
import "./products.css";
import cod from '../images/cod.png';
import delivery from "../images/delivery.png"
import returnIcon from "../images/return.png"
import warranty from "../images/warranty.png"

export const ProductsPage = () => {
    return (
      <main className="products-main">
        <NavBar />
        <section className="products-content">
          <div className="productsWrapper">
            <img src={productImg} alt="" />
            <div className='products-de'>
              A Product in Amazon
              <div>
                <div>9999</div>
                <small>Inclusive of all taxes</small>
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem rem ullam quisquam vel impedit nostrum voluptates
                error magni aspernatur, modi eligendi, voluptate delectus
                possimus similique dicta praesentium, cumque voluptatem
                consequatur?
              </div>
              <section className="assurance">
                <div>
                  <img src={cod} alt="" />
                </div>
                <div>
                  <img src={delivery} alt="" />
                </div>
                <div>
                  <img src={returnIcon} alt="" />
                </div>
                <div>
                  <img src={warranty} alt="" />
                </div>
              </section>
            </div>
            <div>
              <section className="buy-block">
                <div>9999</div>
                <small>In Stock</small>
                <div>Free Delivery</div>
                <button className="products-button">Add to Cart</button>
                <button className="products-button buy-now">Buy Now</button>
              </section>
            </div>
          </div>
          <div>
            <div>More in Category</div>
            <div>
              <FeatureSlider />
            </div>
          </div>
        </section>

        <footer className="footer">
          <small>@2022 Amazon All Rights Reserved</small>
        </footer>
      </main>
    );
}
