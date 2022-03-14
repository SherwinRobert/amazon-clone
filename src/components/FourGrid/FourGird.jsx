import React, { useEffect, useState } from 'react'
import productImg from "../../images/product_placeholder.png";
import './FourGird.css'
import axios from 'axios';

export const FourGird = (props) => {

  const images = props.data?.map(product => {
    return (<img className="grid-img" src={product?.images?.large?.url} alt="" />)
  })

  return (
    <main className="gridWrapper">
      <section className="fourGird">
        {images}
      </section>
    </main>
  );
}
