import React from 'react'
import amazonLogo from '../../images/amazon_logo3.png';
import SearchIcon from "../../icons/Search";
import Cart from "../../icons/cart";
import {Link} from "react-router-dom"

function NavBar(props) {
  return (
  <nav className="navBar">
    <div>
      <Link to={"/"}>
        <img className="logo" src={amazonLogo} alt=""></img>
      </Link>
    </div>
    <form className="input">
      <input className="searchBar" type="text" />
      <button className="searchButton">
        <SearchIcon />
      </button>
    </form>
    <div className="name">
      {!props.sessionState ? (<Link className="linker" to="/login">
        Login
      </Link>):(
        <div className="user-display">
          <div>Hi Sherwin</div>
          <div className="sign-in-div">
              <button className="sign-in-but"><small>LogOut</small></button>
          </div>
      </div>
      )}
    </div>
    <div className="cart">
      <Cart />
      Cart
    </div>
  </nav>
);
}

export default NavBar;