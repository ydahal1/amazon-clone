import * as actions from "./actionTypes";
let initialState = {
  basket: [],
  user: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.addItem:
      return { ...state, basket: [...state.basket, action.payload] };
    case actions.removeItem:
      let newBasket = state.basket.filter(
        item => item.data.id !== action.payload.id
      );
      return {
        ...state,
        basket: newBasket
      };
    case actions.addUser:
      console.log("adding user from reducer");
      return { ...state, user: action.payload };

    default:
      return state;
  }
}
