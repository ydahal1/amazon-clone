import React, { useEffect } from "react";
import "./home.css";
import Product from "./Product";
import { data } from "../dummyData/inventory";
import cartStore from "../store/cartStore";

function Home() {
  useEffect(() => {}, cartStore.data);

  return (
    <div className="home">
      {/* 🔥 Banner Image */}
      <img
        className="home__image"
        src="https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/Brand/JD/2021/Jan_default_onsite/XCM_Manual_1302634-gw_desk_tall-control-en-1x_a4828bce-9dbf-42ae-82d6-a6e42ead4ca4._CB411473854_.png"
        alt="home page banner"
      />
      {/* 🔥 Featured Items */}
      <div className="items">
        {data.map(item => {
          return <Product data={item} />;
        })}
      </div>
    </div>
  );
}

export default Home;
