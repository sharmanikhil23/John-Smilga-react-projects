import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// importing All the Assets
import Data from "./Reviews";
//importing Css

import "./css/app.css";

export const App = () => {
  const [index, setIndex] = useState(0);

  function incIndex() {
    if (index == Data.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function decIndex() {
    if (index == 0) {
      setIndex(Data.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  function randomIndex() {
    let val = Math.floor(Math.random() * Data.length);
    setIndex(val);
  }
  return (
    <div id="playArea">
      <Heading></Heading>
      <Reviews
        {...Data[index]}
        incIndex={incIndex}
        decIndex={decIndex}
        randomIndex={randomIndex}
      ></Reviews>
    </div>
  );
};

const Heading = () => {
  return (
    <section className="playArea-heading">
      <h1 className="playArea-heading-title">Our Reviews</h1>
      <div className="playArea-heading-underline"></div>
    </section>
  );
};

const Reviews = (args) => {
  const { id, name, job, image, text, incIndex, decIndex, randomIndex } = args;
  console.log(args);
  return (
    <section key={id} className="review">
      <div className="review-image-area">
        <img src={image} className="review-image"></img>
      </div>

      <h2 className="review-name">{name}</h2>
      <h2 className="review-title">{job}</h2>
      <p className="review-description">{text}</p>
      <div className="review-arrows">
        <FaAngleLeft
          className="review-arrow"
          onClick={() => decIndex()}
        ></FaAngleLeft>
        <FaAngleRight
          className="review-arrow"
          onClick={() => {
            incIndex();
          }}
        />
      </div>
      <button className="review-random" onClick={() => randomIndex()}>
        Surprise Me
      </button>
    </section>
  );
};
