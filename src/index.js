import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import cartStore from "./store/cartStore";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App store={cartStore} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

//Render when store changes
cartStore.subscribe(render);

//Initial render
render();
