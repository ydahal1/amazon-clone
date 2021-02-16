import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import cartStore from "./store/cartStore";
import * as actions from "./store/actionTypes";

import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { auth } from "./firbase";

function App() {
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        console.log("the user is nn ... ", authUser);
        //User just logged in / or user was logged in
        cartStore.dispatch({
          type: actions.addUser,
          payload: authUser
        });
      } else {
        //User is logged out
        cartStore.dispatch({
          type: actions.addUser,
          payload: null
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
