import React from 'react'
import amazonLogo from '../../images/amazon_logo3.png';
import SearchIcon from "../../icons/Search";
import {ReactComponent as Cart} from "../../icons/cart.svg";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../../hooks/useAuth';

function NavBar(props) {

  const { logOut } = useAuth()
  const history = useNavigate()

  const handleLogOut = async () => {
    await logOut()
    history("/")
  }

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
        {!props.sessionState ? (
          <Link className="linker" to="/login">
            Login
          </Link>
        ) : (
          <div className="user-display">
            <div>Hi Sherwin</div>
            <div className="sign-in-div">
              <button onClick={handleLogOut} className="sign-in-but">
                <div>LogOut</div>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="cart">
        <Link to="/cart">
          <Cart />
        </Link>
        Cart
      </div>
    </nav>
  );
}

export default NavBar;