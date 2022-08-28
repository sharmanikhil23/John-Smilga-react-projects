import React, { useState, useEffect } from "react";

import { Loading } from "./loading";
import { Tour } from "./tour";

import "./css/index.css";

const url = "https://course-api.com/react-tours-project";
export const Tours = () => {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);

  // delete the location for which user is not interested
  const notInterested = (id) => {
    let result = location.filter((data) => {
      if (data.id != id) {
        return data;
      }
    });

    setLocation(result);
  };

  const gettingLocation = () => {
    fetch(url)
      .then((res) => {
        if (res.status == 200) {
          setLoading(false);
        }
        return res.json();
      })
      .then((data) => {
        setLocation(data);
      });
  };
  useEffect(() => {
    gettingLocation();
  }, []);

  if (loading) {
    return (
      <div className="playArea">
        <Loading></Loading>
      </div>
    );
  }

  if (location.length == 0) {
    return (
      <div className="playArea">
        <h1 className="playArea-heading">No Tours Left</h1>
        <button id="referesh" onClick={() => gettingLocation()}>
          Referesh
        </button>
      </div>
    );
  }

  return (
    <div className="playArea">
      <h1 className="playArea-heading">Our Tours</h1>
      <div id="allLocation">
        {location.map((data) => {
          return <Tour {...data} notInterested={notInterested}></Tour>;
        })}
      </div>
    </div>
  );
};
