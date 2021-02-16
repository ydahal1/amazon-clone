import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import { auth } from "../firbase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Set email
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  //Set password
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  //SignIn
  const signIn = e => {
    auth.signInWithEmailAndPassword(email, password);
    history.push("/");
  };

  //Register

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(auth => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch(error => console.log(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form onSubmit={signIn}>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={handleEmailChange} />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit" className="login__signInButton">
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please
          see our privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice
        </p>
        <button className="login__registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
