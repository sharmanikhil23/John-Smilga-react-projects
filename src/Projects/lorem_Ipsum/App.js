import React, { useState } from "react";

import "./css/index.css";

import TextData from "./Data";

export const App = () => {
  const [input, changeInput] = useState(0);
  const [output, changeOutput] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    let data = [];
    for (let i = 0; i < TextData.length && i < input; i++) {
      data[i] = TextData[i];
    }
    changeOutput(data);
    changeInput(0);
  };

  return (
    <section id="play-area">
      <h1 id="play-area-heading">TIRED OF BORING LOREM IPSUM?</h1>
      <form onSubmit={submitHandler} id="play-area-form">
        <label id="play-area-form-input-name">Paragraphs:</label>
        <input
          id="play-area-form-input"
          type="number"
          style={{ border: "1px solid black" }}
          placeholder={input}
          onChange={(e) => {
            changeInput(e.target.value);
          }}
        ></input>
        <button
          id="play-area-form-submit"
          type="submit"
          onSubmit={submitHandler}
        >
          Generate
        </button>
      </form>
      <div>
        {output.map((data) => (
          <p className="output">{data}</p>
        ))}
      </div>
    </section>
  );
};
