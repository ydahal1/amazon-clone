export const addItem = payload => {
  return {
    type: "ADD_ITEDM",
    payload: payload
  };
};

export const removeItem = payload => {
  return {
    type: "REMOVE_ITEM",
    payload: payload
  };
};
export const addUser = payload => {
  return {
    type: "ADD_USER",
    payload: payload
  };
};

export const calculateTotal = payload => {
  return {
    type: "CALCULATE_TOTAL",
    payload: payload
  };
};

export const emptyBasket = payload => {
  return {
    type: "EMPTY_BASKET",
    payload: payload
  };
};

export const increaseQty = payload => {
  return {
    type: "ADD_QTY",
    payload: payload
  };
};

export const decreaseQty = payload => {
  return {
    type: "DECREMENT_QTY",
    payload: payload
  };
};
