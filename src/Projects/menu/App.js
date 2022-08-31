import React, { useState } from "react";

//importing Css
import "./css/index.css";

//importing other files and data
import Data from "./Data";
const category = ["all", ...new Set(Data.map((item) => item.category))];

export const App = () => {
  const [items, setItems] = useState(Data);

  const filterItems = (category) => {
    if (category === "all") {
      setItems(Data);
      return;
    }
    const newItems = Data.filter((item) => item.category === category);
    setItems(newItems);
  };
  return (
    <div id="play-area">
      <Header></Header>
      <div id="play-area-navbar">
        {category.map((data, index) => {
          return (
            <Navigator
              data={data}
              id={index}
              filterItems={filterItems}
            ></Navigator>
          );
        })}
      </div>
      <div className="foods">
        {items.map((food) => {
          return <MenuItems {...food}></MenuItems>;
        })}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div id="play-area-header">
      <h1 id="play-area-heading">Our Menu</h1>
      <div id="play-area-underline"></div>
    </div>
  );
};

const Navigator = (args) => {
  const { data, filterItems, index } = args;

  return (
    <button class="button" id={index} onClick={() => filterItems(data)}>
      {data}
    </button>
  );
};

const MenuItems = (args) => {
  const { id, title, category, price, img, desc } = args;

  return (
    <section key={id} className="food">
      <img className="food-image" alt={title} src={img}></img>
      <div>
        <section className="food-header">
          <h1 className="food-header-name">{title}</h1>
          <h2 className="food-header-price">${price}</h2>
        </section>
        <p className="food-desc">{desc}</p>
      </div>
    </section>
  );
};
