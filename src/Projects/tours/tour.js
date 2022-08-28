import React, { useState } from "react";

export const Tour = (args) => {
  const { id, info, image, name, price } = args;

  const [readMore, setReadMore] = useState(false);
  return (
    <div key={id} className="location">
      <img className="location-image" src={image}></img>
      <div className="location-text-area">
        <div className="location-text-area-heading">
          <h3 className="location-name">{name}</h3>
          <h3 className="location-price">$ {price}</h3>
        </div>
        <p className="location-disc">
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button class="more" onClick={() => setReadMore(!readMore)}>
            {readMore ? "  Show Less" : " Read More"}
          </button>
        </p>
        <button
          className="notInterestedButton"
          onClick={() => {
            console.log("Called");
            args.notInterested(id);
          }}
        >
          {" "}
          Not Interested
        </button>
      </div>
    </div>
  );
};
