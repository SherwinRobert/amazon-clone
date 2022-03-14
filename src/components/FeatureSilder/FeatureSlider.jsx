import React, { useRef } from 'react'
import "./FeatureSilder.css"
import productImg from '../../images/product_placeholder.png'
import { ChevL } from '../../icons/chevL'
import { ChevR } from '../../icons/chevR'

export const FeatureSlider = (props) => {
  const scrollDiv = useRef()
  
  function leftScroll() {
    console.log(scrollDiv.current)
  }

  let elements = props.data?.map(e=>{
    return (
      <div>
        <img
          className="feature-silder-img"
          src={e?.images?.large?.url}
          alt=""
        />
      </div>
    );
  })
  
  function rightScroll() {
    // console.log()
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
