import React from 'react'
import productImg from "../../images/product_placeholder.png"
import './SingleGrid.css'

export const SingleGrid = (props) => {

  console.log(props.data)
  let elements = props.data?.map(e=>{
    // console.log(e.url)
    return (
      <section key={e.id}>
        <small className='single-grid-title'>{e.title}</small>
        <img
          className="single-grid-img"
          src={e?.images?.large?.url}
          alt=""
        />
      </section>
    );
  })
  return (
    <div className="singleGridWrapper">
      {elements}
    </div>
  );
}
