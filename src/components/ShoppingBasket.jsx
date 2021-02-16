import "./shoppingBasket.css";
import BasketItem from "./BasketItem";
import React, { useState } from "react";
import cartStore from "../store/cartStore";
import { v4 as uuidv4 } from "uuid";
import FlipMove from "react-flip-move";

function ShoppingBasket() {
  const store = cartStore.getState();

  return (
    <div>
      {/* <FlipMove> */}
      {store.basket.map(item => {
        return <BasketItem item={item} key={uuidv4()} />;
      })}
      {/* </FlipMove> */}
    </div>
  );
}

export default ShoppingBasket;
