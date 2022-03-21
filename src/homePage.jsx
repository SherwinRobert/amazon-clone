import React, { useEffect,useState } from 'react'
import NavBar from './components/navbar/navbar'
import { Carousal } from './components/carousal/carousal';
import "./components/navbar/navBar.css";
import { SingleGrid } from './components/SingleGrid/SingleGrid';
import { FeatureSlider } from './components/FeatureSilder/FeatureSlider';
import "./App.css";
import useProducts from './hooks/useProducts';
import { useAuth } from './hooks/useAuth';

export const HomePage = (props) => {
  const [products, random] = useProducts(33);
  const [product, productSetter] = useState([])
  const [randomIndexes, indexSetter] = useState([])
  const { user } = useAuth()
  
  console.log(user)

  useEffect(() => {
    if (products.length > 0) {
        let temp = [];
        let filteredArray = [];
        
      if (randomIndexes.length > 0) {

        products.forEach((e, i) => {
          temp.push({ productId: randomIndexes[i], ...products[i] });
        })
        filteredArray.push(temp.slice(0, 16))
        filteredArray.push(temp.slice(16, 25));
        filteredArray.push(temp.slice(25,34))
      }
      
        productSetter(filteredArray);
        indexSetter(random);
      }

    },[products,randomIndexes])
  
  console.log(product)
  return (
    <main>
      {product && (
        <>
          <section>
            <NavBar sessionState={user.isLoggedIn} />
            <Carousal data={product[0]} />
          </section>
          <section className="padder">
            {/* <SingleGrid data={product[1]} /> */}
            <div className="margin-div">
              <h2>Best Sellers in Amazon</h2>
            </div>
            <FeatureSlider data={product[1]} />
            <div><h2>Products for you</h2></div>
            <FeatureSlider data={product[2]} />
          </section>
          <footer className="footer">
            <small>@2022 Amazon All Rights Reserved</small>
          </footer>
        </>
      )}
    </main>
  );
}
