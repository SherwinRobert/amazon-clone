import React,{useEffect,useState} from 'react'
import { NavBarWrapper } from '../hoc/navBarWrapper'
import { FeatureSlider } from '../components/FeatureSilder/FeatureSlider';
import useProducts from '../hooks/useProducts';
import { getOrder } from '../api/getOrder';
import { getProducts } from '../api/getProduct';
import CheckoutItem from '../components/CheckoutItem/CheckoutItem.jsx';
import './orders.css'

export const Orders = () => {
  const [products, random] = useProducts(10);
  const [recom, recomSetter] = useState([]);
  const [orders, setOrders] = useState([])
  const [orderMeta,setOrderMeta] = useState([])
  
  useEffect(() => {
    if (products.length > 0) {
      let temp = [];

      if (random.length > 0) {
        products.forEach((e, i) => {
          temp.push({ productId: random[i], ...products[i] });
        });
        recomSetter(temp);
      }
    }
  }, [products, random]);

  useEffect(() => {
    (async function () {
      let getOrders = await getOrder()
      console.log(getOrders.items)

      setOrderMeta(getOrders)
       await Promise.all(
         getOrders.items.map((e) => {
           return getProducts(e.id);
         })
       ).then((data) => {
         let indexedData = data.map((e, index) => {
           return { productId: getOrders?.items[index].id, ...e };
         });
         setOrders(indexedData);
       });
    })()
  }, [])
  
  console.log(orders)

  
  return (
    <NavBarWrapper>
      <div className='order-top-wrapper'>
        <h2 className="cart-header header-border">Your Orders</h2>
        <div className="order-wrapper">
          <h3 className="deliver-date-div">Delivering on 26 Mar</h3>
          {orders?.map((product, index) => {
            return (
              <CheckoutItem
                product={product}
                productMeta={orderMeta?.items[index]}
              />
            );
          })}
        </div>
        <h2 className="cart-header header-border">Shop more on Amazon</h2>
        {recom.length === 10 && <FeatureSlider data={recom} />}
      </div>
      <footer className="footer">
        <small>@2022 Amazon All Rights Reserved</small>
      </footer>
    </NavBarWrapper>
  );
}
