import React from "react";
import "./product.css";
import cartStore from "../store/cartStore";
import { addItem } from "../store/actionTypes";
import { v4 as uuidv4 } from "uuid";

function Product({ data }) {
  //Functions
  const handleAddToBasket = id => {
    cartStore.dispatch({
      type: addItem,
      payload: {
        data: data
      }
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{data.title} </p>
        <p className="product__price">
          <small>$</small>
          <strong>{data.price}</strong>
        </p>
        <div className="product__rating">
          {Array(data.rating)
            .fill()
            .map((_, i) => (
              <p key={uuidv4()}>⭐️</p>
            ))}
        </div>
      </div>

      <img src={data.image} alt="product-1" />
      <button
        onClick={() => {
          handleAddToBasket(data.id);
        }}
      >
        Add to basket
      </button>
    </div>
  );
}

export default Product;
