import React, { useEffect } from "react";
import "./subtotal.css";
import cartStore from "../store/cartStore";

import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const store = cartStore.getState();

  return (
    <div className="subtotal">
      <p>
        Subtotal ({store.basket.length} items) : {store.totalCost}
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" />
        This order contains gift
      </small>
      <button onClick={e => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
