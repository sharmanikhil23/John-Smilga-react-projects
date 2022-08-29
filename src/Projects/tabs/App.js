import React, { useState, useEffect } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import "./css/index.css";
const url = "https://course-api.com/react-tabs-project";

export const App = () => {
  let [current, setCurrent] = useState(0);
  let [jobs, setJobs] = useState([]);
  let [loading, setLoading] = useState(true);

  const changeCurrent = (companyName) => {
    jobs.filter((data, index) => {
      if (data.company === companyName) {
        const active = document.getElementsByClassName(
          "company-selector-button"
        )[index];

        console.log(active);
        active.classList.add("visited");
        setCurrent(index);
      }
    });
    console.log(companyName);
  };

  const fetchJobs = async () => {
    const response = await fetch(url);
    setJobs(await response.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  const { company, dates, duties, title } = jobs[current];
  return (
    <div id="play-area">
      <div id="heading-area">
        <h1 id="main-heading">Experience</h1>
        <div></div>
      </div>

      <div id="experience-area">
        <div id="company-selector-area">
          {jobs.map((data, index) => {
            return (
              <Menu
                company={data.company}
                key={index}
                changeCurrent={changeCurrent}
              ></Menu>
            );
          })}
        </div>
        <div className="job-area">
          <h1 className="job-area-heading">{title}</h1>
          <h3 className="company">{company}</h3>
          <h3 className="date">{dates}</h3>

          {duties.map((duty, index) => {
            return (
              <>
                <p className="dutie" key={index}>
                  <BsChevronDoubleRight className="dutie-logo" /> {duty}
                </p>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Menu = (args) => {
  const { company, id, changeCurrent } = args;
  return (
    <button
      className="company-selector-button"
      key={id}
      onClick={() => changeCurrent(company)}
    >
      {company}
    </button>
  );
};
