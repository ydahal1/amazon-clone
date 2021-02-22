import React, { useEffect } from "react";
import "./basketItem.css";
import * as actionTypes from "../store/actionTypes";
import cartStore from "../store/cartStore";
import { v4 as uuidv4 } from "uuid";

//store state
const state = cartStore.getState();

//Remove item from store function
function BasketItem({ item }) {
  const deleteItem = id => {
    cartStore.dispatch({
      type: actionTypes.removeItem,
      payload: {
        id
      }
    });
  };

  //increase item qty
  const handleIncrement = payload => {
    cartStore.dispatch({
      type: actionTypes.increaseQty,
      payload: payload
    });
  };

  //Decrease item qty
  const handleDecrement = payload => {
    cartStore.dispatch({
      type: actionTypes.decreaseQty,
      payload: payload
    });
    // reCalculateTotal();
  };

  return (
    <div className="basketItem">
      <img className="basketItem__Image" src={item.data.image} />
      <div className="basketItem__info">
        <p className="basketitem__Title"> {item.data.title}</p>
        <p className="basketItem__Price">
          <small>$</small>
          <strong>{item.data.price}</strong>
        </p>
        <div className="basketItem__Ratings">
          {Array(item.data.rating)
            .fill()
            .map(() => (
              <p key={uuidv4()}>⭐️ </p>
            ))}
        </div>
        <p className="basketItem__description">{item.data.description}</p>

        <p className="basketItem_qtyLabel"> Qty :</p>

        <div className="basketItem__qty">
          <button
            className="basketItem__increaseQty"
            onClick={() => handleIncrement(item.data.id)}
          >
            +
          </button>
          <button>{item.data.qty}</button>

          <button
            className="basketItem__decreaseQty"
            onClick={() => handleDecrement(item.data.id)}
          >
            -
          </button>
        </div>
        <button
          className="basketItem__RemoveBtn"
          onClick={() => {
            deleteItem(item.data.id);
          }}
        >
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default BasketItem;
