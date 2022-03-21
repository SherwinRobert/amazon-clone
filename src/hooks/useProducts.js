import { useState, useEffect } from "react"
import { getProducts } from "../api/getProduct"

const useProducts = (amt) => {
  const [products, setProducts] = useState([])
  const [random,setRandom] = useState([])
  const count = amt > 1000 ? 1000 : amt

    useEffect(() => {
      let randomValues = [...Array(count)].map(() =>
        Math.floor(Math.random() * 1000)
      )
      Promise.all(
        randomValues.map((e) => {
          return getProducts(e);
        })
      )
        .then((data) => {
          setProducts(data)
          setRandom(randomValues)
        }).catch((error) => console.log(error));
    }, []);

    return [products,random]
}

export default useProducts;