import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import "./header.css";
import cartStore from "../store/cartStore";
import { auth } from "../firbase";

function Header() {
  const store = cartStore.getState();
  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://i.ibb.co/M6W7vHY/Pik-Png-com-amazon-logo-png-605185.png"
          alt="logo"
          className="header__logo"
        />
      </Link>

      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionlineOne">
            Hello
            {store.user ? ", " + store.user.email.substr(0, 6) : null}
          </span>
          {store.user ? (
            <span className="header__optionlineTwo" onClick={handleLogOut}>
              Sign Out
            </span>
          ) : (
            <Link to={!store.user && "/login"}>
              <span className="header__optionlineTwo">Sign in</span>
            </Link>
          )}
        </div>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionlineOne">Return </span>
            <span className="header__optionlineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionlineOne"> Your</span>
          <span className="header__optionlineTwo"> Prime</span>
        </div>
        <div className="header__optionBasket">
          <Link to="/checkout">
            <ShoppingBasketIcon className="header__basketIcon" />
          </Link>
          <span className=" header__optionlineTwo header__basketCount">
            {store.basket.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
