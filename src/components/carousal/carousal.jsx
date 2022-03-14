import React from 'react';
import './carousal.css';
import { ChevR } from '../../icons/chevR';
import { ChevL } from '../../icons/chevL';
import carousel1 from '../../images/carousal1.jpg';
import carousel2 from '../../images/carousal2.jpg';
import carousel3 from '../../images/carousal3.jpg';
import { FourGird } from '../FourGrid/FourGird.jsx';

export function Carousal(props) {
  const [count, setCount] = React.useState(0);
  const [carousel] = React.useState([carousel1, carousel2, carousel3]);

  console.log("tell me",props)

  function shiftLeft() {
    console.log('shift left');
    console.log(count);
    setCount((preval) => {
      if (preval >= 2) {
        return 0;
      }
      return preval + 1;
    });
  }

  function shiftRight() {
    console.log(count);
    setCount((preval) => {
      if (preval <= 0) {
        return 2;
      }
      return preval - 1;
    });
  }

  function fourGridData(array) {
    if(array === undefined) return []
    let updatedArray = []
    let temp = []
    for (let i = 1; i <= array.length; i++){
      temp.push(array[i - 1])
      if (i % 4 === 0) {
        updatedArray.push(temp)
        temp = []
      }
    }

    console.log(updatedArray)
    return updatedArray
  }

  return (
    <div>
      <main className="carousal-main">
        <div className="carousal-container">
          <img className="carousalImage" src={carousel[count]} alt="" />
        </div>
        <button onClick={shiftRight} className="carousalButton left-position">
          <ChevR />
        </button>
        <button onClick={shiftLeft} className="carousalButton right-position">
          <ChevL />
        </button>
      </main>
      <div className="flexer">{fourGridData(props?.data).map(e => <FourGird data = {e} />)}</div>
    </div>
  );
}
