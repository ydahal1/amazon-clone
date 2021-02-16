import React from "react";
import "./checkout.css";
import Subtotal from "./Subtotal";
import ShoppingBasket from "./ShoppingBasket";

function Checkout() {
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/images/media/images/banner-ads-examples-ncino.jpg"
          alt="banner"
        />
        <h2 className="checkout__title">Your shopping basket</h2>
        {/* Shopping Basket */}
        <ShoppingBasket />
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
