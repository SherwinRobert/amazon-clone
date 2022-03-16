import React, { useContext, useReducer } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import amazonLogo from '../../images/amazon_logo.png';
import '../loginScreen/loginScreen.css';
import './accountCreater.css';
import { getDatabase, ref, set} from "firebase/database";
import { app } from '../../firebase-config.js';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

function writeUserData(name, email, id) {
  const db = getDatabase();
  set(ref(db, "users/" + id), {
    username: name,
    email: email,
    cart: []
  }).then((response) => console.log(response));
}

export function AccountCreater(props) {
  const navigator = useNavigate();
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [data, dispatch] = useReducer(reducerFun, {
    name: '',
    email: '',
    password: '',
  });

  console.log(state);

  function handleAction(name,email, password) {
    const authentication = getAuth();

    createUserWithEmailAndPassword(authentication, email, password)
      .then(
      (response) => {
          console.log(response?.user?.uid);
          writeUserData(name, email, response?.user?.uid);
          navigator('/')
      })
  }

  function reducerFun(data, action) {
    console.log(action.payload);
    if (action.type === 'post') {
      const updatedObject = {
        ...data,
        ...action.payload,
      };
      console.log(updatedObject);
      // dataFetcher(updatedObject)
      handleAction(updatedObject.name,updatedObject.email, updatedObject.password);
      return updatedObject;
    } if (action.type === 'error') {
      // throw new Error("Passwords Not Matching")
      console.log('passwords not matching');
    }
  }

  function formUpdater(e) {
    const { name, value } = e.target;
    setState((preval) => ({
      ...preval,
      [name]: value,
    }));
  }
  function fetcher(e) {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      console.log('passwords matched');
      dispatch({ type: 'post', payload: state });
    } else if (state.password !== state.confirmPassword) {
      console.log('passwords unmatched');
      dispatch({ type: 'error' });
    }
  }

  return (
    <div className="loginContainer">
      <main className="loginMain">
        <Link to="/">
          <img className="amazonLogo" src={amazonLogo} alt="" />
        </Link>
        <section className="loginForm">
          <div>Create your account</div>
          <form action="">
            <label className="input-label" htmlFor="username">
              Your Name
            </label>
            <br />
            <input
              onChange={formUpdater}
              className="login-input1"
              id="username"
              type="text"
              value={state.name}
              name="name"
            />
            <br />
            <label className="input-label" htmlFor="emailInput">
              Email
            </label>
            <br />
            <input
              onChange={formUpdater}
              className="login-input1"
              id="emailInput"
              type="email"
              value={state.email}
              name="email"
            />
            <br />
            <label className="input-label" htmlFor="passwordInput">
              Password
            </label>
            <br />
            <input
              className="login-input1"
              id="passwordInput"
              type="password"
              value={state.password}
              onChange={formUpdater}
              name="password"
            />
            <br />
            <label className="input-label" htmlFor="passwordConfirm">
              Password Again
            </label>
            <br />
            <input
              className="login-input1"
              id="passwordConfirm"
              type="password"
              value={state.confirmPassword}
              onChange={formUpdater}
              name="confirmPassword"
            />
            <br />
            <button onClick={fetcher} className="login-button1">
              Continue
            </button>
          </form>
          <small className="small-tag">
            By creating an account or logging in, you agree to Amazon’s
            Conditions of Use and Privacy Policy.
          </small>
        </section>
        <section className="loginCreateNew">
          <small>
            Already Have an account?
            <Link className="signup" to="/login">
              Sign Up
            </Link>
          </small>
        </section>
      </main>
    </div>
  );
}
