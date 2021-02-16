import React from "react";
import "./subtotal.css";
import cartStore from "../store/cartStore";

function Subtotal() {
  const store = cartStore.getState();
  let reducer = 0;
  reducer = store.basket.reduce(
    (accumulator, currentValue) => accumulator + currentValue.data.price,
    0
  );

  return (
    <div className="subtotal">
      <p>
        Subtotal ({store.basket.length} items) : {reducer}
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" />
        This order contains gift
      </small>
      <button> Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
