import React, { useRef } from 'react'
import "./FeatureSilder.css"
import productImg from '../../images/product_placeholder.png'
import { ChevL } from '../../icons/chevL'
import { ChevR } from '../../icons/chevR'
import { Link } from 'react-router-dom'

export const FeatureSlider = (props) => {
  const scrollDiv = useRef()
  console.log("feature-slider",props.data)
  function leftScroll() {
    console.log(scrollDiv.current)
  }

  let elements = props?.data?.map(e=>{
    return (
      <div>
        <Link to={`/products/${e.productId}`}>
          <img
            className="feature-silder-img"
            src={e?.images?.large?.url}
            alt=""
          />
        </Link>
      </div>
    );
  })
  
  function rightScroll() {
    scrollDiv.current.scroll({ left: 100 });
  }
    return (
      <div className="feature-silder-wrapper">
        <button onClick={leftScroll} className="feature-button but-pos-r">
          <ChevR />
        </button>
        <button onClick={rightScroll} className="feature-button but-pos-l">
          <ChevL />
        </button>
        <div ref={scrollDiv} className='feature-wrapper'>
          {elements}
        </div>
      </div>
    );
}
