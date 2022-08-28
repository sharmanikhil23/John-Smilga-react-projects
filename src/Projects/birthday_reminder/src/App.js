import React, { useState } from "react";

//importing the data
import Data from "./Data";

//importing css
import "../css/app.css";

export const App = () => {
  const [data, changeData] = useState(Data);
  return (
    <div id="persons">
      <h1 id="title">{data.length} Persons have birthday today</h1>
      <Person data={data} changeData={changeData}></Person>
      <button
        className="button"
        onClick={() => {
          changeData([]);
        }}
      >
        Clear All
      </button>
    </div>
  );
};

const Person = ({ data, changeData }) => {
  let deleteing = (id) => {
    let result = data.filter((dat) => {
      if (dat.id != id) {
        return dat;
      }
    });

    changeData(result);
  };
  return (
    <>
      {data.map(({ id, name, age, image }) => {
        return (
          <div key={id} className="person">
            <img src={image} className="person-image" />
            <div>
              <h3>{name}</h3>
              <p>{age} years</p>
            </div>
            <button className="button small-btn" onClick={() => deleteing(id)}>
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};
