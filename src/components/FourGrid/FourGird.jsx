import React, { useEffect, useState } from 'react'
import productImg from "../../images/product_placeholder.png";
import './FourGird.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export const FourGird = (props) => {

  const images = props.data?.map(product => {
    return (
      <Link to={`/products/${product.productId}`}>
        <img className="grid-img" src={product?.images?.large?.url} alt="" />
      </Link>
    );
  })

  return (
    <main className="gridWrapper">
      <section className="fourGird">
        {images}
      </section>
    </main>
  );
}
