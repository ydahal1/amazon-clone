import * as actions from "./actionTypes";
let initialState = {
  basket: [],
  user: null,
  totalCost: 0
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
      return { ...state, user: action.payload };
    case actions.calculateTotal:
      return { ...state, totalCost: action.payload };
    case actions.emptyBasket:
      return { ...state, basket: action.payload };
    case actions.increaseQty:
      let value;
      let currentIndex;

      state.basket.map((item, index) => {
        if (item.data.id === action.payload) {
          value = item.data.qty;
          currentIndex = index;
        }
      });

      return { ...state, ...(state.basket[currentIndex].data.qty += 1) };

    case actions.decreaseQty:
      let decreaseValue;
      let decreaseIndex;

      state.basket.map((item, index) => {
        if (item.data.id === action.payload) {
          decreaseValue = item.data.qty;
          decreaseIndex = index;
        }
      });

      if (decreaseValue > 1) {
        return { ...state, ...(state.basket[decreaseIndex].data.qty -= 1) };
      } else {
        return { ...state, ...(state.basket[decreaseIndex].data.qty = 1) };
      }

    default:
      return state;
  }
}

// //Total cost  calculation
// let state = cartStore.getState();
// let reducer;
// reducer = state.basket
//   .reduce(
//     (accumulator, currentValue) =>
//       accumulator + currentValue.data.price * currentValue.data.qty,
//     0
//   )
//   .toFixed(2);

// //updating new total in store
// cartStore.dispatch({
//   type: actionTypes.calculateTotal,
//   payload: reducer
// });
