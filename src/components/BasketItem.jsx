import React from "react";
import "./basketItem.css";
import * as actionTypes from "../store/actionTypes";
import cartStore from "../store/cartStore";
import { v4 as uuidv4 } from "uuid";

function BasketItem({ item }) {
  const deleteItem = id => {
    console.log("removing item ...", id);
    cartStore.dispatch({
      type: actionTypes.removeItem,
      payload: {
        id
      }
    });
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
              <p key={uuidv4()}>🌟 </p>
            ))}
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
