import React, { useState, useEffect } from "react";
import "./payment.css";
import cartStore from "../store/cartStore";
import * as actionTypes from "../store/actionTypes";
import BasketItem from "./BasketItem";
import { v4 as uuidv4 } from "uuid";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import instance from "../axios";
import { useHistory } from "react-router-dom";

import { db } from "../firbase";

function Payment() {
  //Store
  const store = cartStore.getState();

  //History
  const history = useHistory();

  //local state
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //Generate stripe secret
    const getClientSecret = async () => {
      const response = await instance({
        method: "post",
        //Stripe expects the total in currencies subunits or cents
        url: `/payments/create?total=${store.totalCost * 100}`
      });
      console.log(response);
      setClientSecret(response.data.clientSecret.client_secret);
    };
    getClientSecret();
  }, [cartStore.basket]);

  console.log("The secret is ... ", clientSecret);

  //Stripe
  const stripe = useStripe();
  const elements = useElements();

  //Form handling functions
  const handlePaymentSumbmit = async e => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      })
      .then(({ paymentIntent }) => {
        //Payment intent = payment confirmation
        if (store.user) {
          db.collection("users")
            .doc(store.user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              basket: store.basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created
            });
        }

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        cartStore.dispatch({
          type: actionTypes.emptyBasket,
          payload: []
        });

        history.replace("/orders");
      });
  };

  const handleCardChange = e => {
    //Listen for changes inside the card element
    //Display any errors as the customer types the card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__itemcount">
        Checkout ( {store.basket.length} Items )
      </div>
      <div className="payment__deliveryAddress">
        <div className="payment__label"> Delivery Address</div>
        <div className="payment__deliveryStreetAddress">
          <p>Email Here</p>
          <p>2560 Trelipe Drive</p>
          <p>Lawrenceville, GA 30044</p>
        </div>
      </div>
      <div className="payment__basketItems">
        <div className="payment__label"> Review Items and Delivery</div>
        <div className="payment__basketItemsList">
          {store.basket.map(item => {
            return <BasketItem item={item} key={uuidv4()} />;
          })}
        </div>
      </div>
      <div className="payment__paymentMethod">
        <div className="payment__label">Payment Method</div>
        <div className="payment__contents">
          <form onSubmit={handlePaymentSumbmit}>
            <CardElement onChange={handleCardChange} />
            <div className="payment__priceContainer">
              <p>Order Total : {store.totalCost}</p>
              <button disabled={processing || disabled || succeeded}>
                {processing ? <p>Processing</p> : "Buy Now"}
              </button>
            </div>
            {/* Error */}
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
