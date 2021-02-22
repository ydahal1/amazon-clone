import React, { useState, useEffect } from "react";
import cartStore from "../store/cartStore";
import { db } from "../firbase";

import Order from "./Order";

import "./orders.css";
import { ConsoleWriter } from "istanbul-lib-report";

function Orders() {
  const [orders, setOrders] = useState([]);

  //store state
  const state = cartStore.getState();

  useEffect(() => {
    if (state.user) {
      db.collection("users")
        .doc(state.user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot(snapshot => {
          setOrders(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  console.log(orders, ". ORDERS");
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__allOrders">
        {orders.map(order => {
          console.log(order);
          return <Order order={order} />;
        })}
      </div>
    </div>
  );
}

export default Orders;
