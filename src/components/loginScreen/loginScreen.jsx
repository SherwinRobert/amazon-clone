import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import amazonLogo from '../../images/amazon_logo.png'
import './loginScreen.css'
import { app } from "../../firebase-config.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const LoginScreen = (props) => {

  const input = useRef()
  const history = useNavigate()
  const [state, setState] = useState({
    email: "",
    password:""
  })
  
  console.log(state)
  function verifier(email, password) {
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        console.log(response)
        history('/')
        props.setSession({
          name: email,
          isLoggedIn:true
        })
      })
  }

  function submitter(e) {
    console.log("clicked")
    e.preventDefault()
    if (input.current.value !== "") {
      verifier(state.email,state.password)
    }
  }

  function formUpdater(e) {
    let { name, value } = e.target;
    setState((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  }

  function newAccount(e) {
    e.preventDefault()
    history("/signup")
  }

    return (
      <div className="loginContainer">
        <main className="loginMain">
          <img className="amazonLogo" src={amazonLogo} alt="" />
          <section className="loginForm">
            <div>Sign-In</div>
            <form action="">
              <label className="input-label" htmlFor="emailInput">
                Email or mobile phone number
              </label>
              <br />
              <input
                ref={input}
                className="login-input"
                id="emailInput"
                type="email"
                value={state.email}
                onChange={formUpdater}
                name="email"
              />
              <br />
              <label className="input-label" htmlFor="passwordInput">
                Password
              </label>
              <br />
              <input
                ref={input}
                className="login-input"
                id="passwordInput"
                type="password"
                value={state.password}
                onChange={formUpdater}
                name="password"
              />
              <br />
              <button onClick={submitter} className="login-button">
                Continue
              </button>
            </form>
            <small className="small-tag">
              By continuing, you agree to Amazon's Conditions of Use and Privacy
              Notice.
            </small>
          </section>
          <section className="loginCreateNew">
            <small className="small-tag">New to Amazon</small>
            <br />
            <button onClick={newAccount} className="login-button createButton">
              Create your Amazon account
            </button>
          </section>
        </main>
      </div>
    );
}
