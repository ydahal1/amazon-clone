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
