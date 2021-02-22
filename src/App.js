import "./App.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import cartStore from "./store/cartStore";
import * as actions from "./store/actionTypes";

import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Payment from "./components/Payment";
import Orders from "./components/Orders";

import { auth } from "./firbase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// User authentication
function App() {
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
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

  //Total cost  calculation
  let state = cartStore.getState();

  //updating new total in store
  function reCalculateTotal() {
    console.log("BAKSKET CHAGNGED");
    let reducer;
    reducer = state.basket
      .reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.data.price * currentValue.data.qty,
        0
      )
      .toFixed(2);
    cartStore.dispatch({
      type: actions.calculateTotal,
      payload: reducer
    });
  }
  useEffect(() => {
    reCalculateTotal();
  }, [state.basket]);

  return (
    <Provider store={cartStore}>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/orders">
              <Header />
              <Orders />
            </Route>
            <Route path="/payment">
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>
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
    </Provider>
  );
}

export default App;

//  "proxy": "http://localhost:5001/clone-2f5b1/us-central1/api",
