import React, { useEffect,useState } from 'react'
import NavBar from './components/navbar/navbar'
import { Carousal } from './components/carousal/carousal';
import "./components/navbar/navBar.css";
import { SingleGrid } from './components/SingleGrid/SingleGrid';
import { FeatureSlider } from './components/FeatureSilder/FeatureSlider';
import "./App.css";
import { getDatabase, ref , get,child } from "firebase/database";

export const HomePage = (props) => {

  const [product, productSetter] = useState([])

  const readProducts = async(id) => {
    const dbRef = ref(getDatabase());
    let prod;
    try {
      prod = await get(child(dbRef, `products/${id}`))
    } catch(error) {
      console.log(error)
    }

    return prod.val();
  }


  useEffect(() => {

    Promise.all([...Array(30)].map(() => {
      let random = Math.floor(Math.random() * 1000)
      return readProducts(random)
    })).then(data => {

      let temp = [];
      let filteredArray = [];
      for (let i = 0; i < data.length; i++) {
        temp.push(data[i]);
        switch (i) {
          case 15:
            filteredArray.push(temp);
            temp = [];
            break;
          case 20:
            filteredArray.push(temp);
            temp = [];
            break;
          case 29:
            filteredArray.push(temp);
            break;
          default:
            break;
        }
      }
      productSetter(filteredArray);
      console.log("filtered data is",filteredArray);
    }).catch(error => console.log(error))

    },[])
  
  console.log(product)
  return (
    <main>
      {product && (
        <>
          <section>
            <NavBar sessionState={props.sessionState} />
            <Carousal data={product[0]} />
          </section>
          <section className="padder">
            <SingleGrid data={product[1]} />
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
